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

const upload = require("../../utils/multerConfig");

// Middleware for authentication

const router = express.Router();

router.use(
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ])
);

// Create a new book
router.post("/books", createBook); //**

// Get all books
router.get("/books", getAllBooks); //**

// Get books by store ID
router.get("/books/store/:store_id", getBooksByStore); //**

// Update book
router.put("/books/:book_id", updateBook); //**

// Delete book
router.delete("/books/:book_id", deleteBook); //**

// Add review to book
router.post("/books/review", addReview); //**

// Get a single book by its ID
router.get("/books/:book_id", getSingleBook);

module.exports = router;
