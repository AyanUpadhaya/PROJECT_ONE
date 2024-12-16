import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="w-100 ">
        <div className="d-flex flex-column justify-content-between gap-3 ">
          <div className="d-flex justify-content-between gap-3 align-items-center">
            <div>
              <h2>Profile</h2>
            </div>
            <div>
              <button
                onClick={() => navigate("/dashboard/user/settings")}
                className="btn btn-success"
              >
                Edit Profile
              </button>
            </div>
          </div>
          {/* card */}
          <div>
            <div className="card">
              <div className="d-flex flex-column flex-md-row gap-3">
                <div
                  style={{ width: "18rem", height: "18rem" }}
                  className="p-3 rounded object-cover bg-light"
                >
                  {user?.photoUrl ? (
                    <>
                      <img
                        src={user?.photoUrl}
                        class="card-img-top rounded object-cover"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Name: {(user && user?.name) || "user"}
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold">Address:</span>{" "}
                    {(user && user?.address) || "No data found"}
                  </p>
                  <div className="card-text">
                    <span className="fw-bold">Email:</span>{" "}
                    {(user && user?.email) || "No data found"}
                    <br />
                    <span className="fw-bold">Store Id:</span>{" "}
                    {(user && user?.store_id) || "No data found"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
