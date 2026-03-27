const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connect (IMPORTANT)
mongoose.connect("mongodb+srv://nisha:ekisha77@cluster0.uklak6o.mongodb.net/artcraft?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch(err => console.log(err));

// ================= SCHEMA =================
const Order = mongoose.model("Order", {
  name: String,
  address: String,
  phone: String,
  products: Array
});

// ================= ROUTES =================

// TEST ROUTE (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// SAVE ORDER
app.post("/order", async (req, res) => {
  try {
    console.log("Order Received:", req.body);

    const newOrder = new Order(req.body);
    await newOrder.save();

    res.send("Order Saved Successfully 💖");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving order ❌");
  }
});

// GET ALL ORDERS (ADMIN PAGE)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching orders ❌");
  }
});

// ================= PORT =================

// Render ke liye dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
