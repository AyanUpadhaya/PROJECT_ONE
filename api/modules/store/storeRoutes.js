const express = require("express");
const {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  getUserStores,
  updateStore,
  toggleLikeStore,
} = require("./storeController");
const verifyToken = require("../../utils/verifyToken"); // Middleware for authentication
const upload = require("../../utils/multerConfig");


const router = express.Router();
router.use(
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ])
);


// Create a new store
router.post("/stores", verifyToken, createStore); //**

// Get all stores
router.get("/stores", getAllStores); //**

// Get a store by ID
router.get("/stores/:id", getStoreById); //**

// Delete a store (only empty stores can be deleted)
router.delete("/stores/:id", deleteStore); //**

// Get all stores created by the authenticated user
router.get("/stores/user", getUserStores); //**

// Update a store
router.put("/stores/:id", updateStore); //**

// Like/Unlike a store
router.put("/stores/:id/like", toggleLikeStore); //**

module.exports = router;
