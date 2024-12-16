import React from 'react'
import UserBooksTable from './UserBooksTable';

const UserBooks = () => {
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
          <UserBooksTable></UserBooksTable>
        </div>
      </div>
    </div>
  );
}

export default UserBooks