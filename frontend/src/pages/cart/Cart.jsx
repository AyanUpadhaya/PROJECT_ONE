import React, { useEffect, useState } from "react";
import "./Cart.css";
import useCart from "../../hooks/useCart";
import BookRow from "./BookRow";

function Cart() {
  const { fetchBooksFromCart, removeFromCart } = useCart();
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const loadCartBooks = async () => {
      const books = await fetchBooksFromCart();
      // Add a default userQty field with value 1 for each book
      const updatedBooks = books.map((book) => ({
        ...book,
        userQty: 1, // Default quantity for each book
      }));
      setCartBooks(updatedBooks);
    };
    loadCartBooks();
  }, [fetchBooksFromCart]);

  const handleQuantityChange = (id, newQty) => {
    setCartBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === id
          ? { ...book, userQty: Math.max(1, Math.min(newQty, book.qty)) }
          : book
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartBooks
      .reduce((total, book) => total + book.sell_price * book.userQty, 0)
      .toFixed(2);
  };
  const handleRemoveBook = (bookId) => {
    // Implement remove functionality here
    // cartBooks(cartBooks.filter(book=>book._id !== bookId));
    removeFromCart(bookId);
    console.log(bookId);
  };

  return (
    <div className="py-2">
      <div className="card">
        <div className="card-header">
          <h2>Shopping Cart</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered m-0">
              <thead>
                <tr>
                  <th
                    className="text-center py-3 px-4"
                    style={{ minWidth: "400px" }}
                  >
                    Product Name &amp; Details
                  </th>
                  <th
                    className="text-right py-3 px-4"
                    style={{ width: "100px" }}
                  >
                    Price
                  </th>
                  <th
                    className="text-center py-3 px-4"
                    style={{ width: "160px" }}
                  >
                    Quantity
                  </th>
                  <th
                    className="text-right py-3 px-4"
                    style={{ width: "100px" }}
                  >
                    Total
                  </th>
                  <th
                    className="text-center align-middle py-3 px-0"
                    style={{ width: "40px" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartBooks.length > 0 ? (
                  cartBooks.map((book) => (
                    <BookRow
                      key={book._id}
                      onQuantityChange={handleQuantityChange}
                      book={book}
                      handleRemoveBook={handleRemoveBook}
                    ></BookRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {cartBooks.length > 0 && (
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="text-right mt-4">
                <label className="text-muted font-weight-normal m-0">
                  Total price
                </label>
                <div className="text-large">
                  <strong>${calculateTotalPrice()}</strong>
                </div>
              </div>

              <div className="float-right">
                <div className="mb-3">
                  <label className="text-muted font-weight-normal">
                    Select Payment Method:
                  </label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="pickup"
                        value="pickup"
                      />
                      <label className="form-check-label" htmlFor="pickup">
                        Pickup
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        value="cashOnDelivery"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cashOnDelivery"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-lg btn-primary mt-2">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
