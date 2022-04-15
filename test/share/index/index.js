// The whole point of this unit is just to provide a main NodeJS module.
try {
  process.exitCode = 0;
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
