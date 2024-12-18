const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByStore,
  getUserOrders,
} = require("./orderController");
const verifyToken = require("../../utils/verifyToken");

const router = express.Router();

// Create a new order
router.post("/orders", verifyToken, createOrder); //**

// Get all orders
router.get("/orders", verifyToken, getAllOrders); //**

// Get order by ID
router.get("/orders/:id", verifyToken, getOrderById);

// Update order status (for pending/completed status)
router.patch("/orders/status/:orderId", verifyToken, updateOrderStatus); //**

// Get orders by store ID (for the user's own store)
router.get("/orders/store/:storeId", verifyToken, getOrdersByStore); //**

// Route to get user's orders
router.get("/orders/:userId/my_orders", verifyToken, getUserOrders);

module.exports = router;
