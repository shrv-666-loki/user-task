const os = require('os');
const noOfCpu = os.cpus().length;

module.exports = [
  {
    script: './dist/main.js',
    name: 'user-task',
    exec_mode: 'cluster',
    instances:noOfCpu,
    autorestart: true,
    watch: true,
    increment_var: 'PORT',
    env: {
      PORT: 3000,
      NODE_ENV: 'development',
    },
    env: {
        PORT: 3000,
        NODE_ENV: 'production',
      }
  },
];
