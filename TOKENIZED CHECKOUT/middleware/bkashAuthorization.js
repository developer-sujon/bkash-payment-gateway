const globals = require("node-global-storage");
const grantToken = require("../action/grantToken");

const authCheck = async (req, res, next) => {
  let created_at = new Date(globals.get("created_at"));
  let id_token = globals.get("id_token");
  let expires_in = globals.get("expires_in");
  let currentDateTime = new Date();

  if (!id_token) {
    await grantToken();
  } else {
    if (currentDateTime - created_at < expires_in) {
      await grantToken();
    } else {
      console.log("You already have a token !!");
    }
  }
  next();
};

module.exports = authCheck;
