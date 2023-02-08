const createPayment = require("../action/createPayment.js");
const executePayment = require("../action/executePayment.js");
const searchTransaction = require("../action/searchTransaction.js");
const refundTransaction = require("../action/refundTransaction.js");

const checkout = async (req, res) => {
  try {
    const createResult = await createPayment(req);
    res.json(createResult);
  } catch (e) {
    console.log(e);
  }
};

const bkashCallback = async (req, res) => {
  try {
    if (req.query.status === "success") {
      let response = await executePayment(req.query.paymentID);
      if (response.statusCode !== "0000") {
        res.send(response.statusMessage);
      }
      res.send(response);
    } else {
      res.send("Payment " + req.query.status);
    }
  } catch (e) {
    console.log(e);
  }
};

const search = async (req, res) => {
  try {
    res.send(await searchTransaction(req.body.trxID));
  } catch (e) {
    console.log(e);
  }
};

const refund = async (req, res) => {
  try {
    res.send(await refundTransaction(req.body));
  } catch (e) {
    console.log(e);
  }
};

const refundStatus = async (req, res) => {
  try {
    res.send(await refundTransaction(req.body));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkout,
  bkashCallback,
  search,
  refund,
  refundStatus,
};
