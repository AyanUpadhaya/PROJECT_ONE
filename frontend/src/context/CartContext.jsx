import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a book ID to the cart
  const addToCart = (bookId) => {
    if (!cart.includes(bookId)) {
      setCart((prevCart) => [...prevCart, bookId]);
    }
  };

  // Remove a book ID from the cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((id) => id !== bookId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart data (IDs only)
  const getCart = () => cart;

  // Fetch books data based on IDs in the cart
  const fetchBooksFromCart = async () => {
    try {
      const response = await fetch("/api/books"); // Replace with your actual API endpoint
      const books = await response.json();
      return books.filter((book) => cart.includes(book._id));
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        fetchBooksFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
