const bkashConfig = require("../config/bkashConfig.json");
const globals = require("node-global-storage");
const fetch = require("node-fetch");
const tokenHeaders = require("./tokenHeaders.js");
const globaDataSet = require("./globalDataSet");

const refreshToken = async () => {
  console.log("Refresh Token API Start !!");
  try {
    const tokenResponse = await fetch(bkashConfig.refresh_token_url, {
      method: "POST",
      headers: tokenHeaders(),
      body: JSON.stringify({
        app_key: bkashConfig.app_key,
        app_secret: bkashConfig.app_secret,
        refresh_token: globals.get("refresh_token")
      }),
    });
    const tokenResult = await tokenResponse.json();

    globaDataSet(tokenResult);

    return tokenResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = refreshToken;
