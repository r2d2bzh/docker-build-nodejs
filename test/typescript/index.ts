// This test sample ensures that a TypeScript entry point can be bundled
enum Status {
  Ok = 'OK',
}

interface Report {
  node: string;
  status: Status;
}

const report: Report = { node: process.versions.node, status: Status.Ok };
console.log(report.node, report.status);
