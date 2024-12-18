import React from "react";

const UserPurchaseTable = ({ orders }) => {
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Store</th>
              <th>Books</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.stores[0]?.store_id?.name}</td>
                <td>
                  <ul className="list-unstyled">
                    {order.stores[0]?.books.map((book) => (
                      <li key={book.book_id._id}>
                        <span className="fw-bold">{book.book_id.title}</span>
                        <br /> by {book.book_id.author}
                        <br />
                        Qty: {book.qty}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.stores[0]?.total_price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPurchaseTable;
