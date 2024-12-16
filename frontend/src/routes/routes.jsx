import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import DashboardlLayout from "../layouts/DashboardlLayout";
import AdminHome from "../pages/dashboards/admin/home/AdminHome";
import AdminProfile from "../pages/dashboards/admin/profile/AdminProfile";
import UserHome from "../pages/dashboards/user/home/UserHome";
import UserProfile from "../pages/dashboards/user/profile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import RedirectToDashboard from "../utils/RedirectToDashboard";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AdminOrders from "../pages/dashboards/admin/orders/AdminOrders";
import AdminUsers from "../pages/dashboards/admin/users/AdminUsers";
import AdminStores from "../pages/dashboards/admin/stores/AdminStores";
import AdminAddCategory from "../pages/dashboards/admin/categorys/AdminAddCategory";
import AdminCategorys from "../pages/dashboards/admin/categorys/AdminCategorys";
import AdminSettings from "../pages/dashboards/admin/settings/AdminSettings";
import AdminBooks from "../pages/dashboards/admin/books/AdminBooks";
import AdminUpdateCategory from "../pages/dashboards/admin/categorys/AdminUpdateCategory";
import { CategoryProvider } from "../context/CategoryContext";
import Cart from "../pages/cart/Cart";
import UserBooks from "../pages/dashboards/user/books/UserBooks";
import UserAddBooks from "../pages/dashboards/user/books/UserAddBooks";
import UserUpdateBooks from "../pages/dashboards/user/books/UserUpdateBooks";
import UserPurchase from "../pages/dashboards/user/purchase/UserPurchase";
import UserStore from "../pages/dashboards/user/store/UserStore";
import UserAddStore from "../pages/dashboards/user/store/UserAddStore";
import UserUpdateStore from "../pages/dashboards/user/store/UserUpdateStore";
import UserStoreOrders from "../pages/dashboards/user/orders/UserStoreOrders";
import UserSettings from "../pages/dashboards/user/settings/UserSettings";

const router = createBrowserRouter([
  //website
  {
    path: "/",
    element: <WebsiteLayout></WebsiteLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
    ],
  },

  //dashboard
  // if user access dashboard route then redirect to role based dashboard
  {
    path: "/dashboard",
    element: <RedirectToDashboard></RedirectToDashboard>,
  },
  //role based dashboard for user and admin
  {
    path: "/dashboard/*",
    element: <DashboardlLayout></DashboardlLayout>,
    children: [
      //admin routes
      {
        path: "admin",
        element: <PrivateRoute role={"admin"}></PrivateRoute>,
        children: [
          {
            path: "",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "orders",
            element: <AdminOrders></AdminOrders>,
          },
          {
            path: "users",
            element: <AdminUsers></AdminUsers>,
          },
          {
            path: "books",
            element: <AdminBooks></AdminBooks>,
          },
          {
            path: "stores",
            element: <AdminStores></AdminStores>,
          },
          {
            path: "categorys",
            element: (
              <CategoryProvider>
                <AdminCategorys></AdminCategorys>,
              </CategoryProvider>
            ),
          },
          {
            path: "categorys/add",
            element: (
              <CategoryProvider>
                <AdminAddCategory></AdminAddCategory>
              </CategoryProvider>
            ),
          },
          {
            path: "categorys/update",
            element: (
              <CategoryProvider>
                <AdminUpdateCategory></AdminUpdateCategory>
              </CategoryProvider>
            ),
          },
          {
            path: "settings",
            element: <AdminSettings></AdminSettings>,
          },
        ],
      },
      //user options
      {
        path: "user",
        element: <PrivateRoute role={"user"}></PrivateRoute>,
        children: [
          //general
          {
            path: "",
            element: <UserHome></UserHome>,
          },
          {
            path: "profile",
            element: <UserProfile></UserProfile>,
          },
          // books
          {
            path: "books",
            element: <UserBooks></UserBooks>,
          },
          {
            path: "books/add",
            element: <UserAddBooks></UserAddBooks>,
          },
          {
            path: "books/update",
            element: <UserUpdateBooks></UserUpdateBooks>,
          },
          // user purchase history
          {
            path: "purchase_history",
            element: <UserPurchase></UserPurchase>,
          },
          // store
          {
            path: "store",
            element: <UserStore></UserStore>,
          },
          {
            path: "store/add",
            element: <UserAddStore></UserAddStore>,
          },
          {
            path: "store/update",
            element: <UserUpdateStore></UserUpdateStore>,
          },
          // store orders
          {
            path: "orders",
            element: <UserStoreOrders></UserStoreOrders>,
          },
          //settings
          {
            path: "settings",
            element: <UserSettings></UserSettings>,
          },
        ],
      },
    ],
  },
]);

export default router;
