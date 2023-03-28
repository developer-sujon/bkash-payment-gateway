const bkashConfig = require("../config/bkashConfig.json");
const globals = require("node-global-storage");

const authHeaders = async () => {

console.log(globals.get("id_token"))

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: globals.get("id_token"),
    "x-app-key": bkashConfig.app_key,
  };
};

module.exports = authHeaders;
