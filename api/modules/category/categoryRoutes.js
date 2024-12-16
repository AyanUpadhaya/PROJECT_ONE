const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");
// const verifyToken = require("../../utils/verifyToken");
// Create a new category
router.post("/categories", categoryController.createCategory);//** 

// Get all categories
router.get("/categories", categoryController.getCategories); //** 

// Get a category by ID
router.get("/categories/:id", categoryController.getCategoryById); //** 

// Update a category
router.put("/categories/:id", categoryController.updateCategory); //** 

// Delete a category
router.delete("/categories/:id", categoryController.deleteCategory); //** 

module.exports = router;
