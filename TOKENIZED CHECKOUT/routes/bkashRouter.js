const express = require("express");
const router = express.Router();

const {
  bkashCallback,
  checkout,
  refund,
  refundStatus,
  search,
} = require("../controller/bkashController.js");
const authCheck = require("../middleware/bkashAuthorization.js");

router.use(authCheck);

router.post("/createPayment", checkout);
router.get("/executePayment", bkashCallback);
router.get("/queryPayment", search);
router.get("/refundTransaction", refund);
router.get("/refundStatus", refundStatus);

module.exports = router;
