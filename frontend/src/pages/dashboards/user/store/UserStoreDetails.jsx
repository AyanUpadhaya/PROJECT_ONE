import React from "react";
import { useLocation } from "react-router-dom";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import useStore from "../../../../hooks/useStore";

const UserStoreDetails = () => {
  const { state } = useLocation();
  const { payload, type } = state || {};
  console.log(payload);

  const { myStore } = useStore();
  return (
    <div className="w-100">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/store"}
        title={"Back"}
      ></BackToPrev>
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex flex-column  gap-1 align-items-center">
          <div>
            <h2>{myStore?.name}</h2>
          </div>
          <div>
            <img className="img-fluid" src={myStore?.cover_photo} alt="" />
          </div>
          <div className="w-full py-2">
            <p className="text-start text-lg">
              <span className="fw-bold">Description</span>:{" "}
              {myStore?.description}
            </p>
            <p className="text-start text-lg">
              <span className="fw-bold">Location</span>: {myStore?.location}
            </p>
          </div>
          <div className="align-self-start">
            <div className="d-flex gap-2">
              <div className="card p-3">
                <div className="card-body">
                  <h3>Likes:{myStore?.liked_by.length}</h3>
                </div>
              </div>
              <div className="card p-3">
                <div className="card-body">
                  <h3>Books:{myStore?.book_ids.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoreDetails;
