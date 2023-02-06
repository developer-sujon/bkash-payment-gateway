const globals = require("node-global-storage");

const globaDataSet = (tokenResult) => {
  let currentDateTime = new Date();
  globals.set("created_at", currentDateTime, { protected: true });
  globals.set("id_token", tokenResult.id_token, { protected: true });
  globals.set("refresh_token", tokenResult.refresh_token, { protected: true });
  globals.set("expires_in", (tokenResult.expires_in - 100) * 1000, {
    protected: true,
  });
};

module.exports = globaDataSet;
