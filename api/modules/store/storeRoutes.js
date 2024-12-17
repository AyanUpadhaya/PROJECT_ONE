const express = require("express");
const {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  getUserStores,
  updateStore,
  toggleLikeStore,
  updateCoverPicture,
} = require("./storeController");
const verifyToken = require("../../utils/verifyToken"); // Middleware for authentication

const router = express.Router();

//Get all stores
router.get("/stores", getAllStores); //**

// Create a new store
router.post("/stores", verifyToken, createStore); //**

// Get a store by ID
router.get("/stores/:id", getStoreById); //**

// Delete a store (only empty stores can be deleted) -admin only
router.delete("/stores/:id", deleteStore); //**

//update cover picture
router.patch("/stores/:id/picture", verifyToken, updateCoverPicture); //**

// Get all stores created by the authenticated user
router.get("/stores/user/:userId", getUserStores); //**

// Update a store
router.put("/stores/:id", verifyToken, updateStore); //**

// Like/Unlike a store
router.put("/stores/:id/like", verifyToken, toggleLikeStore); //**

module.exports = router;
