const fetch = require("node-fetch");
const authHeaders = require("../action/authHeader.js");
const bkashConfig = require("../config/bkashConfig.json");

const createPayment = async (req) => {
  const { amount, currency, intent, merchantInvoiceNumber } = req.body;

  console.log("Create Payment API Start !!!");
  try {
    const createResopnse = await fetch(bkashConfig.create_payment_url, {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({
        mode: "0011",
        payerReference: " ",
        callbackURL: bkashConfig.callback_url,
        amount, // amount should be dynamic
        currency,
        intent,
        merchantInvoiceNumber, // should be unique number
      }),
    });
    const createResult = await createResopnse.json();

    return createResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = createPayment;
