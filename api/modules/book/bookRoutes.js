const express = require("express");
const {
  createBook,
  getAllBooks,
  getBooksByStore,
  updateBook,
  deleteBook,
  addReview,
  getSingleBook,
} = require("./bookController");
const verifyToken = require("../../utils/verifyToken");

const router = express.Router();

// Create a new book
router.post("/books", verifyToken, createBook); //**

// Get all books
router.get("/books", getAllBooks); //**

// Get books by store ID
router.get("/books/store/:store_id", getBooksByStore); //**

// Update book
router.put("/books/:book_id", verifyToken, updateBook); //**

// Delete book
router.delete("/books/:book_id", verifyToken, deleteBook); //**

// Add review to book
router.post("/books/review", verifyToken, addReview); //**

// Get a single book by its ID
router.get("/books/:book_id", getSingleBook);

module.exports = router;
