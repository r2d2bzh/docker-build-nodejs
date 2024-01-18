import yac from '@r2d2bzh/yac';

const config = yac('./config/config.yaml');
console.log(process.versions.node, config.get('message'));