const { customError } = require("../helper/errorHandler");

/**
 * @desc Bkash GrantToken
 * @access private
 */
const grantToken = async (req, res, next) => {
  try {
    const url = `${process.env.BKASH_BASE_URL}/checkout/token/grant`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        username: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
      },
      body: JSON.stringify({
        app_key: process.env.BKASH_API_KEY,
        app_secret: process.env.BKASH_API_SECRET,
      }),
    });

    return await response.json();
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Create Payment
 * @access public
 * @route /api/v1/bkash/createPayment
 * @methud POST
 */
const createPayment = async (req, res, next) => {
  const { amount, merchantInvoiceNumber } = req.body;

  try {
    if (!amount || !merchantInvoiceNumber) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/create`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "X-APP-Key": process.env.BKASH_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Execute Payment
 * @access public
 * @route /api/v1/bkash/executePayment/:paymentID
 * @methud GET
 */
const executePayment = async (req, res, next) => {
  const paymentID = req.params.paymentID;

  try {
    if (!paymentID) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/execute/${paymentID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
    });

    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ message: "Payment Successfull", data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Query Payment
 * @access public
 * @route /api/v1/bkash/queryPayment/:paymentID
 * @methud GET
 */
const queryPayment = async (req, res, next) => {
  const paymentID = req.params.paymentID;

  try {
    if (!paymentID) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/query/${paymentID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
    });
    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Void
 * @access public
 * @route /api/v1/bkash/void/:paymentID
 * @methud GET
 */
const queryVoid = async (req, res, next) => {
  const paymentID = req.params.paymentID;

  try {
    if (!paymentID) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/void/${paymentID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
    });
    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Search Transaction
 * @access public
 * @route /api/v1/bkash/searchTransaction/:trxID
 * @methud GET
 */
const searchTransaction = async (req, res, next) => {
  const trxID = req.params.trxID;

  try {
    if (!trxID) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/query/${trxID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
    });
    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Payment Refund
 * @access public
 * @route /api/v1/bkash/refundTransaction
 * @methud POST
 */
const refundTransaction = async (req, res, next) => {
  const { amount, paymentID, trxID, sku, reason } = req.body;

  try {
    if (!paymentID || !trxID || !amount || !sku || !reason) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/refund`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "content-type": "application/json",
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
      body: JSON.stringify({
        paymentID,
        trxID,
        amount,
        sku,
        reason,
      }),
    });
    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ message: "Payment Refund Successfull", data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Bkash Refund Status
 * @access public
 * @route /api/v1/bkash/refundStatus
 * @methud POST
 */
const refundStatus = async (req, res, next) => {
  const { paymentID, trxID } = req.body;

  try {
    if (!paymentID || !trxID) {
      throw customError("Invalid Data");
    }

    const { id_token } = await grantToken();

    const url = `${process.env.BKASH_BASE_URL}/checkout/payment/refund`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${id_token}`,
        "content-type": "application/json",
        "X-APP-Key": process.env.BKASH_API_KEY,
      },
      body: JSON.stringify({
        paymentID,
        trxID,
      }),
    });
    const data = await response.json();

    if (data?.errorCode) {
      throw customError(data?.errorMessage);
    }

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  executePayment,
  queryPayment,
  queryVoid,
  searchTransaction,
  refundTransaction,
  refundStatus,
};
