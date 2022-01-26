try {
  console.log(process.versions.node, 'ADD OPTIONS OK');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
