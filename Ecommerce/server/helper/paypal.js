const paypal = require("paypal-rest-sdk");
require("dotenv").config();
paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CID,
  client_secret: process.env.PAYPAL_CSECREATE,
});

module.exports = paypal;
