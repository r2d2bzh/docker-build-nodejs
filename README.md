---
date: 2022-01-25
title: NodeJS image builder
---

This repository mainly builds three Docker images used during the development of a NodeJS application.

The `docker-build-nodejs-devenv` image is provided to ease the building of a Docker image used during development.

The two other images are provided to ease the building of production Docker images embedding a NodeJS based application:

-   `docker-build-nodejs-builder` is in charge a building a Linux executable from the Javascript files

-   `docker-build-nodejs-runtime` is in charge of providing the **minimal** base environment for the linux executable to run on

# Using a dockerized development environment

The goal is to ensure the usage of predictable versions of commands such as `npm` or `node`. In order to do this, a development Docker container providing the necessary versions of these tools is started. One keypoint is that all these tools needs to be started by a user with the same user and group identifier than the developer.

## Creating a [Dockerfile](https://docs.docker.com/engine/reference/builder/)

You will have to provide a `Dockerfile` with at least the following line:

<div class="formalpara-title">

**Dockerfile.dev**

</div>

``` Dockerfile
FROM ghcr.io/r2d2bzh/docker-build-nodejs-devenv:dev
```

<div class="important">

Replace the tag `dev` with a tag delivered on the [r2d2bzh/docker-build-nodejs project](https://github.com/r2d2bzh/docker-build-nodejs).

</div>

## Creating a [docker-compose file](https://docs.docker.com/compose/compose-file/)

This `docker-compose.yml` file will help to easily build and start the development container.

It should contain something close to the following:

<div class="formalpara-title">

**docker-compose.yml**

</div>

``` YAML
  dev:
    build:
      context: dev
      args:
        USER: ${LOGNAME}
        UID: ${UID}
        GID: ${GID}
    volumes:
      - .:/home/user/dev
```

<div class="tip">

Most of the time the `UID` variable is already defined by your shell but is not exported. `GID` must be the numeric identifier of your user default group. `USER` can also be defined if you need to change the username for whatever reason, it can be for instance set to `${LOGNAME}` in the compose file as this is the POSIX variable containing the user login.

Hence:

<div class="formalpara-title">

**.profile**

</div>

``` sh
export UID
export GID=$(id -g)
```

</div>

## Starting and using the development environment

To start the development environment simply issue the following command:

``` Bash
docker-compose up -d dev
```

You can now use any NodeJS related command within the container as you would do it directly in the project by prefixing it with `docker-compose exec dev`, for instance:

``` Bash
docker-compose exec dev npm install
```

<div class="tip">

You can define a shell alias to avoid typing the whole command each time (`alias ded=docker-compose exec dev` to be able to type `ded npm install`) but beware that you will loose the completion provided for the `docker-compose` command.

</div>

# Embedding a NodeJS application

Embedding a NodeJS application is necessary to provide a production Docker image which guarantees that no other command than the application itself can be started in a container based on this image. In particular, no shell is available within such a container.

## Creating a [Dockerfile](https://docs.docker.com/engine/reference/builder/)

You will have to provide a `Dockerfile` with at least the following two lines:

<div class="formalpara-title">

**Dockerfile**

</div>

``` Dockerfile
FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev as builder
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
```

<div class="important">

Replace the tag `dev` with a tag delivered on the [r2d2bzh/docker-build-nodejs project](https://github.com/r2d2bzh/docker-build-nodejs).

</div>

This `Dockerfile` should be located at the root of your NodeJS project or at least in a folder containing all the source code of the NodeJS application. You can optionally add additional `Dockerfile` commands, it is at least recommended to document the port the NodeJS application is listening on (if the NodeJS application offers such a port):

<div class="formalpara-title">

**Dockerfile**

</div>

``` Dockerfile
FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev as builder
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
EXPOSE 8080
```

<div class="warning">

Do not modify the entrypoint of the Docker image with `ENTRYPOINT` as the default entrypoint is already the application executable.

</div>

<div class="warning">

Use the **same tag** for both `FROM` instructions as both `builder` and `runtime` images are closely related.

</div>

## Specifying the application’s main module

By default [esbuild](https://esbuild.github.io/) will be passed `index.js` as the main module of the application to embed. If the application main module is not located at `index.js`, simply set the `main` build argument to the right path of the main module:

``` yaml
test-simple:
  build:
    context: test/simple
    args:
      main: simple.js
```

## Building the Docker image

Once the `Dockerfile` is available, you can at least operate a test build with the following command:

``` Bash
cd <Dockerfile folder>
docker build -t <target> .
```

Once the build succeeds, the image can be tested:

``` Bash
docker run --rm -it <target>
```

<div class="tip">

Do not forget to [publish the port](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port—​p---expose) your application is listening on in order to operate some requests from your development platform.

</div>

## Building the Docker image with a compose file

In order to avoid repeating on and on the same `docker build` command with all its arguments, you might want to create a `docker-compose.yml` file detailing this data, i.e.:

<div class="formalpara-title">

**docker-compose.yml**

</div>

``` YAML
services:
  production:
    image: <target>
    build:
      context: .
```

Once the compose file is available, simply issue the command `docker-compose build production` to build the image. You can also push this new image to a registry with `docker-compose push production` as long as the image tag refers to a location on this registry.

## Native modules

Automatic native modules bundling [might sometimes fail](https://github.com/evanw/esbuild/issues/1051) for various reasons. The main reason is most of the time due to the fact that the files to bundle [cannot be inferred by esbuild](https://github.com/evanw/esbuild/issues/1051#issuecomment-807732496).

In this particular cases, follow the instructions provided in the console where the build was operated:

<div class="formalpara-title">

**excerpt from builder/bundle/index.js**

</div>

``` javascript
console.warn('/!\\ Some node modules were automatically externalized');
console.warn('If one of these modules can still NOT be loaded:');
console.warn(' - add the module name in your package.json file under { esbuildOptions: { external: [...] } }');
console.warn(' - add the module COPY line provided in the following list at the end of your Dockerfile');
```

The console then displays the list of externalized modules and the Dockerfile `COPY` lines to use.

The `test/sharp` test case of this repository follows these advices for `sharp`:

<div class="formalpara-title">

**package.json**

</div>

``` json
{
  ...
  "esbuildOptions": {
    "external": ["sharp"]
  },
  ...
}
```

<div class="formalpara-title">

**Dockerfile**

</div>

``` dockerfile
FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev as builder
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
COPY --from=builder /project/node_modules/sharp/ ./node_modules/sharp/
```
