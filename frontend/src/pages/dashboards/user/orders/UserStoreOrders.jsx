import React from 'react'
import UserStoreOrdersTable from "./UserStoreOrdersTable";
const UserStoreOrders = () => {
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Store orders</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <UserStoreOrdersTable></UserStoreOrdersTable>
        </div>
      </div>
    </div>
  );
}

export default UserStoreOrders