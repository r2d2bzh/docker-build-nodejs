const path = require('path')

const readPackageJson = require('read-package-json-fast')

const { isNativeModule } = require('./detector')

// Filters out relative or absolute file paths.
const packageFilter = /^([^./]*)$/

// Filters valid package names and extracts the base directory.
const packageName = /^([^@][^/]*|@[^/]*\/[^/]+)(?:\/|$)/

const findNativeModule = (packageJsonPath, cache) => {
  if (cache[packageJsonPath] === undefined) {
    cache[packageJsonPath] = readPackageJson(packageJsonPath).then(
      (data) => [Boolean(isNativeModule(data), data), data],
      () => [],
    )
  }

  return cache[packageJsonPath]
}

const externalNativeModulesPlugin = (externalizedModules) => ({
  name: 'external-native-modules',
  setup(build) {
    const cache = {}

    build.onResolve({ filter: packageFilter }, async (args) => {
      const package = packageName.exec(args.path)

      if (!package) return

      let directory = args.resolveDir

      while (true) {
        if (path.basename(directory) !== 'node_modules') {
          const modulePath = path.join(directory, 'node_modules', package[1])
          const packageJsonPath = path.join(modulePath, 'package.json')
          const [isNative, packageJsonData] = await findNativeModule(packageJsonPath, cache)

          if (isNative === true) {
            if (externalizedModules[args.path] === undefined) {
              externalizedModules[args.path] = {}
            }

            externalizedModules[args.path][modulePath] = packageJsonData.version

            return { path: args.path, external: true }
          }

          if (isNative === false) {
            return
          }
        }

        const parentDirectory = path.dirname(directory)

        if (parentDirectory === directory) {
          break
        }

        directory = parentDirectory
      }
    })
  },
})

module.exports = { externalNativeModulesPlugin }
