require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//app config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const userRoutes = require("./modules/user/userRoutes");
const bookRoutes = require("./modules/book/bookRoutes");
const orderRoutes = require("./modules/order/orderRoutes");
const storeRoutes = require("./modules/store/storeRoutes");
const categoryRoutes = require("./modules/category/categoryRoutes");

//import first admin utility
const createFirstAdmin = require("./utils/createFirstAdmin");

//mongoose
const connection_string = process.env.MOGO_URI;
mongoose
  .connect(connection_string)
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running on port: 3000");
      console.log("Database connection successful");
    });
    createFirstAdmin().then(() => {});
  })
  .catch((err) => {
    console.log("Failed to connect Database ", err);
    process.exit(1);
  });

//routes
app.use(userRoutes);
app.use(bookRoutes);
app.use(orderRoutes);
app.use(storeRoutes);
app.use(categoryRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
