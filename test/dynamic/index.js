// This test sample ensures dynamically loaded dependencies only generate warning when not found.
const dynamic = () => process.env.UNSET_DYNAMIC_ENV_VAR ? require('inexistent_dynamically_loaded_module') : 'TEST';

setInterval(() => console.log(process.versions.node, dynamic()), 2000);
