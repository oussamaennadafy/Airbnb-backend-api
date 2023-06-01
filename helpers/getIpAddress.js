const os = require("os");

function getIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const interface = interfaces[name];
    for (const address of interface) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address;
      }
    }
  }
}

module.exports = getIpAddress;
