// This test sample ensures dynamically loaded dependencies only generate warning when not found.
try {
  const dynamic = () => process.env.UNSET_DYNAMIC_ENV_VAR ? require('inexistent_dynamically_loaded_module') : 'TEST';
  console.log(process.versions.node, dynamic());
} catch(error) {
  console.error(error);
  process.exitCode = 1;
}
