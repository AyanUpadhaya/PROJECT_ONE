import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../../../hooks/useAuth";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  function isActive(path, location) {
    return path.includes(location.pathname) ? "active" : "text-white";
  }

  const renderSiderbarLinks = (role, isActive) => {
    switch (role) {
      case "user":
        return (
          <ul className="nav nav-pills flex-column mb-auto">
            {/* home */}
            <li className="nav-item">
              <Link
                to={`/dashboard/${role}`}
                className={`nav-link ${isActive(
                  ["/dashboard/user"],
                  location
                )}`}
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            {/* profile */}
            <li>
              <Link
                to={`/dashboard/${role}/profile`}
                className={`nav-link ${isActive(
                  ["/dashboard/user/profile"],
                  location
                )}`}
                aria-current="page"
              >
                Profile
              </Link>
            </li>
            {/* store */}
            <li>
              <Link
                to={`/dashboard/${role}/store`}
                className={`nav-link ${isActive(
                  [
                    "/dashboard/user/store",
                    "/dashboard/user/store/add",
                    "/dashboard/user/store/details",
                    "/dashboard/user/store/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                Store
              </Link>
            </li>
            {/* books */}
            <li>
              <Link
                to={`/dashboard/${role}/books`}
                className={`nav-link ${isActive(
                  [
                    "/dashboard/user/books",
                    "/dashboard/user/books/add",
                    "/dashboard/user/books/details",
                    "/dashboard/user/books/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                Books
              </Link>
            </li>
            {/* my orders */}
            <li>
              <Link
                to={`/dashboard/${role}/purchase_history`}
                className={`nav-link ${isActive(
                  ["/dashboard/user/purchase_history"],
                  location
                )}`}
                aria-current="page"
              >
                My Orders
              </Link>
            </li>
            {/* store orders */}
            <li>
              <Link
                to={`/dashboard/${role}/orders`}
                className={`nav-link ${isActive(
                  ["/dashboard/user/orders"],
                  location
                )}`}
                aria-current="page"
              >
                Store Orders
              </Link>
            </li>
            {/* Settings */}
            <li>
              <Link
                to={`/dashboard/${role}/settings`}
                className={`nav-link ${isActive(
                  ["/dashboard/user/settings"],
                  location
                )}`}
                aria-current="page"
              >
                Settings
              </Link>
            </li>
          </ul>
        );
        break;
      case "admin":
        return (
          <ul className="nav nav-pills flex-column mb-auto">
            {/* home */}
            <li className="nav-item">
              <Link
                to={`/dashboard/${role}`}
                className={`nav-link ${isActive("/dashboard/admin", location)}`}
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
          
            {/* books */}
            <li>
              <Link
                to={`/dashboard/${role}/books`}
                className={`nav-link ${isActive(
                  ["/dashboard/admin/books"],
                  location
                )}`}
                aria-current="page"
              >
                Books
              </Link>
            </li>
            {/* categorys */}
            <li>
              <Link
                to={`/dashboard/${role}/categorys`}
                className={`nav-link ${isActive(
                  [
                    "/dashboard/admin/categorys",
                    "/dashboard/admin/categorys/add",
                    "/dashboard/admin/categorys/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                Categories
              </Link>
            </li>
            {/* users */}
            <li>
              <Link
                to={`/dashboard/${role}/users`}
                className={`nav-link ${isActive(
                  ["/dashboard/admin/users"],
                  location
                )}`}
                aria-current="page"
              >
                Users
              </Link>
            </li>
            {/* orders */}
            <li>
              <Link
                to={`/dashboard/${role}/orders`}
                className={`nav-link ${isActive(
                  ["/dashboard/admin/orders"],
                  location
                )}`}
                aria-current="page"
              >
                Orders
              </Link>
            </li>
            {/* Stores */}
            <li>
              <Link
                to={`/dashboard/${role}/stores`}
                className={`nav-link ${isActive(
                  ["/dashboard/admin/stores"],
                  location
                )}`}
                aria-current="page"
              >
                Stores
              </Link>
            </li>
          </ul>
        );
        break;
    }
  };

  // /dashboard/admin
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-full"
      style={{ width: "280px" }}
    >
      <Link
        to={"/"}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Buchhandlung</span>
      </Link>
      <hr />
      <div>{renderSiderbarLinks(user?.role, isActive)}</div>
    </div>
  );
}
