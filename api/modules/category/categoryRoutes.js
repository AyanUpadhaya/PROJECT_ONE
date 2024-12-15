const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");
// const verifyToken = require("../../utils/verifyToken");
// Create a new category
router.post("/categorys", categoryController.createCategory);//** 

// Get all categories
router.get("/categorys", categoryController.getCategories); //** 

// Get a category by ID
router.get("/categorys/:id", categoryController.getCategoryById); //** 

// Update a category
router.put("/categorys/:id", categoryController.updateCategory); //** 

// Delete a category
router.delete("/categorys/:id", categoryController.deleteCategory); //** 

module.exports = router;
