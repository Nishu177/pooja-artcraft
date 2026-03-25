const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/artcraft")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Order Schema
const Order = mongoose.model("Order", {
  name: String,
  address: String,
  phone: String,
  products: Array
});

// ================= ROUTES =================

// SAVE ORDER
app.post("/order", async (req, res) => {
  console.log("Order Received:", req.body);

  const newOrder = new Order(req.body);
  await newOrder.save();

  res.send("Order Saved Successfully 💖");
});

// GET ALL ORDERS (ADMIN PAGE)
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// ==========================================

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});