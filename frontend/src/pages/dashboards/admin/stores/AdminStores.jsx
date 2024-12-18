import React from "react";
import useStore from "../../../../hooks/useStore";
import AdminStoreTable from "./AdminStoreTable";

const AdminStores = () => {
  const { loading, error, stores } = useStore();

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Something went wrong</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-100 h-100">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Store {stores?.length}</h2>
          </div>
        </div>
        {/* table */}
        <AdminStoreTable data={stores}></AdminStoreTable>
      </div>
    </div>
  );
};

export default AdminStores;
