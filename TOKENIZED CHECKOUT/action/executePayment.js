const bkashConfig = require("../config/bkashConfig.json");
const authHeaders = require("../action/authHeader.js");
const fetch = require("node-fetch");

const executePayment = async (paymentID) => {
  console.log("Execute Payment API Start !!!");
  const executeResponse = await fetch(bkashConfig.execute_payment_url, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({
      paymentID,
    }),
  });
  const executeResult = await executeResponse.json();
  return executeResult;
};

module.exports = executePayment;
