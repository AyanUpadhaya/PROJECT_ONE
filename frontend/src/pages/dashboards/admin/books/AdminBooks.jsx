import React from "react";
import AdminBooksTable from "./AdminBooksTable";

const AdminBooks = () => {
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Books</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <AdminBooksTable></AdminBooksTable>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
