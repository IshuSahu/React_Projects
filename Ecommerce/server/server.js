const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require('./routes/admin/product-routes')
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
// app.use(cors());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
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
app.use("/api/admin/products", adminProductRouter);

// app.get("/", (req, res) => {
//   res.send("server is running");
// });

app.listen(PORT, "127.0.0.1", () => {
  // localhost accupied
  console.log(`Server is running on port ${PORT}`);
});
