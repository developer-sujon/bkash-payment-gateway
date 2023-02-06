const bkashConfig = require("../config/bkashConfig.json");
const fetch = require("node-fetch");
const authHeaders = require("../action/authHeader.js");

const refundTransaction = async (body_data) => {
  console.log("Refund API Start !!!");
  const refundResponse = await fetch(bkashConfig.refund_transaction_url, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body_data),
  });
  const refundResult = await refundResponse.json();
  return refundResult;
};

module.exports = refundTransaction;
