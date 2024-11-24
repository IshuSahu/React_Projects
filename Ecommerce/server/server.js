const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
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

// Ensure only one server instance binds to the port
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "ShopCity",
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Use Render-provided PORT or fallback to 4000
    const server = app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Exiting...`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  })
  .catch((err) => console.error(`${err} did not connect`));

// Middleware
app.use(
  cors({
    origin: process.env.BASE_URL || "*", // Allow all origins for now
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

// Routes
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

// Fallback Route
app.get("/", (req, res) => {
  res.send("Server is running");
});
