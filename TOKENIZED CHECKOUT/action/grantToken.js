const bkashConfig = require("../config/bkashConfig.json");
const fetch = require("node-fetch");
const tokenHeaders = require("./tokenHeaders.js");
const globaDataSet = require("./globalDataSet");

const grantToken = async () => {
  console.log("Grant Token API Start !!");
  try {
    const tokenResponse = await fetch(bkashConfig.grant_token_url, {
      method: "POST",
      headers: tokenHeaders(),
      body: JSON.stringify({
        app_key: bkashConfig.app_key,
        app_secret: bkashConfig.app_secret,
      }),
    });
    const tokenResult = await tokenResponse.json();

    globaDataSet(tokenResult);

    return tokenResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = grantToken;
