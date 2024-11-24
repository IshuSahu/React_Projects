const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouters = require("./routes/admin/product-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductRoters = require("./routes/shop/product-route");
const shopCartRouter = require("./routes/shop/cart-routes");
const addressRouter = require("./routes/shop/address-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/features-route");

const app = express();

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "ShopCity",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // If you're sending cookies or credentials
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouters);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/user/products", shopProductRoters);
app.use("/api/user/cart", shopCartRouter);
app.use("/api/user/address", addressRouter);
app.use("/api/user/order", shopOrderRouter);
app.use("/api/user/search", shopSearchRouter);
app.use("/api/user/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
// app.get("/", (req, res) => {
//   res.send("server is running");
// });

app.listen(PORT, "127.0.0.1", () => {
  // localhost accupied
  console.log(`Server is running on port ${PORT}`);
});
