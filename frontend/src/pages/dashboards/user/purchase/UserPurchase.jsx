import React from "react";
import UserPurchaseTable from "./UserPurchaseTable";

const UserPurchase = () => {
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>My orders</h2>
          </div>
        </div>
        {/* table */}
        <div>
          <UserPurchaseTable></UserPurchaseTable>
        </div>
      </div>
    </div>
  );
};

export default UserPurchase;
