const clientConfig = require("./webpack/client.config");
const serverConfig = require("./webpack/server.config");

module.exports = function(env, argv) {
  return [clientConfig(env, argv), serverConfig(env, argv)];
};
