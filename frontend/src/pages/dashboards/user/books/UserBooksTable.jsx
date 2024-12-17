import React from 'react'
import { useNavigate } from 'react-router-dom';
import formatToLocaleDateString from '../../../../utils/formatToLocaleDateString';

const UserBooksTable = ({data}) => {
  const navigate = useNavigate();

  const handleNavigate = (item, path) => {
    navigate(`${path}`, {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((book, index) => (
                <tr key={book._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category_id?.name || "N/A"}</td>
                  <td>{formatToLocaleDateString(book.createdAt)}</td>
                  <td className="d-flex gap-2 align-items-center">
                    <button
                      onClick={() => handleNavigate(book, "details")}
                      className="btn btn-success"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleNavigate(book, "edit")}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserBooksTable