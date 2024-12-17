import React from "react";
import { formatToUSDate } from "../../../../utils/formatToUSDate";
import { useNavigate } from "react-router-dom";
import formatToLocaleDateString from "../../../../utils/formatToLocaleDateString";

const UserStoreTable = ({ data }) => {
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
              <th scope="col">Store Name</th>
              <th scope="col">Owner</th>
              <th scope="col">Books</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data?.name}</td>
              <td>{data?.created_by?.name}</td>
              <td>{data?.book_ids?.length}</td>
              <td>{formatToLocaleDateString(data?.createdAt)}</td>
              <td className="d-flex gap-2 align-items-center">
                <button
                  onClick={() => handleNavigate(data, "update")}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleNavigate(data, "details")}
                  className="btn btn-success"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserStoreTable;
