//External Import
const bkashRoutes = require("express").Router();

//Internal Lib Impot
const bkashController = require("../controller/bkashControllers");

//Bkash Create Payment
bkashRoutes.post("/createPayment", bkashController.createPayment);

//Bkash Cxecute Payment
bkashRoutes.get("/executePayment/:paymentID", bkashController.executePayment);

//Bkash Query Payment
bkashRoutes.get("/queryPayment/:paymentID", bkashController.queryPayment);

//Bkash Void
bkashRoutes.get("/void/:paymentID", bkashController.queryVoid);

//Bkash Search Transaction
bkashRoutes.get("/searchTransaction/:trxID", bkashController.searchTransaction);

//Bkash Refund Transaction
bkashRoutes.post("/refundTransaction", bkashController.refundTransaction);

//Bkash Refund Status
bkashRoutes.post("/refundStatus", bkashController.refundStatus);

module.exports = bkashRoutes;
