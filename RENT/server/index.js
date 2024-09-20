const express = require("express");
const path = require('path');

const app = express();
const listingRoutes = require('./routes/listing.js')
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const authRoutes = require('./routes/auth')

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Routes
app.use('/auth',authRoutes)
app.use('/properties', listingRoutes)





/* MONGOOSE SETUP */
const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Rent_It",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
