//@flow
const compose = require('docker-compose');
const path = require('path');
const ip = require('ip');

const cwd = path.join(__dirname);
const log = true;

// ip address is required for docker image to connect to local server
console.log('local ip address:', ip.address());
process.env.HOST_IP = ip.address();

async function startDocker() {
  console.log('starting docker');
  return await compose.upAll({ cwd, log });
}

async function stopDocker() {
  console.log('stopping docker');
  return await compose.stop({ cwd, log });
}

module.exports = { startDocker, stopDocker };
