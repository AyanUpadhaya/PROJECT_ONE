const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByStore,
} = require("./orderController");
//const verifyToken = require("../../utils/verifyToken");

const router = express.Router();

// Create a new order
router.post("/orders", createOrder); //** 

// Get all orders
router.get("/orders", getAllOrders); //** 

// Get order by ID
router.get("/orders/:id", getOrderById);

// Update order status (for pending/completed status)
router.put("/orders/:id/status", updateOrderStatus); //** 

// Get orders by store ID (for the user's own store)
router.get("/orders/store/:storeId", getOrdersByStore); //** 

module.exports = router;
