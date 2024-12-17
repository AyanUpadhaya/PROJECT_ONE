import axios from "axios";
import { createContext, useState, useCallback, useEffect } from "react";
import { getToken } from "../utils/getToken";
import useLoadUser from "../hooks/useLoadUser";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isBookPosting, setIsBookPosting] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [storeBooks, setStoreBooks] = useState([]);
  const { user } = useLoadUser();

  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance with Authorization header

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  //helper
  const handleErrorMessage = (error) => {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    setErrorMessage(errorMessage);
  };

  // Create a new book
  const createBook = async (bookData, coverPhoto) => {
    setIsBookPosting(true);
    setError(null);
    const formData = new FormData();

    // Append the book data object as a string
    formData.append("data", JSON.stringify(bookData));

    // Append the file
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    try {
      const response = await axiosInstance.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Book created successfully!");
      setStoreBooks((prev) => [...prev, response?.data?.data]);

      return response?.data?.data;
    } catch (err) {
      handleErrorMessage(err);
      console.error(err);
    } finally {
      setIsBookPosting(false);
    }
  };

  // Fetch all books
  const getAllBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/books");
      if (response?.data) {
        setBooks(response?.data);
      }
     
    } catch (err) {
      handleErrorMessage(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const getBooksByStore = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/books/store/${user?.store_id}`);
      if (response?.data) {
        setStoreBooks(response?.data);
      }
      return response.data
    } catch (err) {
      handleErrorMessage(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Update a book
  const updateBook = async (bookId, updatedData, coverPhoto) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();

    // Append updated data
    formData.append("data", JSON.stringify(updatedData));

    // Append the new file if provided
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    try {
      const response = await axiosInstance.put(`/books/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Book updated successfully!");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a book
  const deleteBook = async (bookId) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/books/${bookId}`);
      setSuccessMessage("Book deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const libs = {
    user,
    books,
    loading,
    error,
    errorMessage,
    setErrorMessage,
    storeBooks,
    setStoreBooks,
    successMessage,
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    setSuccessMessage,
    isBookPosting,
    setIsBookPosting,
  };

  useEffect(() => {
    if (books.length == 0) {
      getAllBooks();
      getBooksByStore();
      
    }
  }, []);

  return <BookContext.Provider value={libs}>{children}</BookContext.Provider>;
};
