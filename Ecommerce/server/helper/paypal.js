const paypal = require('paypal-rest-sdk')

paypal.configure({
  mode: "sandbox",
  client_id: "ATYt7l4C6zcQq4i8-p-NkB0_UihlyXLz4gLmHI8JKugMKCPspgiG0Of6DygEpjBWFZVbT72G0LXSZI3t",
  client_secret: "EFLBDPHHzMsSm3kYU1c8x93t7bKhlNrW3c7IXOYuRlYoIm-99M50_HdAUG_woXzR70fU0b4QgRyWcD6t",
});

module.exports = paypal;