import React from "react";
import useOrders from "../../../../hooks/useOrders";

const UserStoreOrdersTable = ({ orders }) => {
  const { updateOrderStatus, error, statusUpdating } = useOrders();

  const handleStatusUpdate = (id, status) => {
    updateOrderStatus(id, status);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Books Ordered</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.stores.map((store) => (
                <tr key={`${order._id}-${store._id}`}>
                  <td>{order._id}</td>
                  <td>{order.order_by.name}</td>
                  <td>
                    {store.books.map((book) => (
                      <div key={book.book_id._id}>
                        <strong>Title:</strong> {book.book_id.title}
                        <br />
                        <strong>Quantity:</strong> {book.qty}
                        <br />
                        <strong>Price:</strong> ${book.price}
                        <hr />
                      </div>
                    ))}
                  </td>
                  <td>${store.total_price}</td>
                  <td>{order.status}</td>
                  <td>{order.payment_method}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td className="d-flex flex-column gap-1">
                    <button
                      disabled={
                        order.status == "completed" ||
                        order.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(order?._id, "completed")
                      }
                      className="btn btn-sm btn-dark"
                    >
                      Complete
                    </button>
                    <br />
                    <button
                      disabled={
                        order.status == "completed" ||
                        order.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(order?._id, "cancelled")
                      }
                      className="btn btn-sm btn-danger"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStoreOrdersTable;
