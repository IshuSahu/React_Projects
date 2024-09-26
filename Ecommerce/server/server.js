const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

/* MONGOOSE SETUP */
const PORT = 3000;
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



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
