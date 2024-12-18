import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { getToken } from "../../../../utils/getToken";
import { useEffect, useState } from "react";

function UserHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [storeBooks, setStoreBooks] = useState([]);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Fetch orders by store
  const fetchOrdersByStore = async (storeId) => {
    setLoading(true)
    setError(null)
    try {

      const response = await axiosInstance.get(`/orders/store/${storeId}`);
      setOrders(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err)
    } finally{
      setLoading(false)
    }
  };

  const getBooksByStore = async (storeId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get(`/books/store/${storeId}`);
      if (response?.data) {
        setStoreBooks(response?.data);
        return response.data;
      }
    } catch (err) {
      console.error(err);
      setError(err)
    } finally{
      setLoading(false)
    }
  };

  function callApi() {
    fetchOrdersByStore(user?.store_id)
    getBooksByStore(user?.store_id);
  }

  useEffect(() => {
    callApi();
  }, []);

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
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-100 h-100">
        <div className="d-flex flex-column justify-content-between gap-3 ">
          {/* head */}
          <div className="d-flex justify-content-between gap-3 align-items-center">
            <div>
              <h2>Dashboard</h2>
            </div>
          </div>
          {/* table */}
          <div className="container">
            <div class="row">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Total Books</h5>
                    <p class="card-text fw-bold text-lg">
                      {storeBooks?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Total Orders</h5>
                    <p class="card-text fw-bold text-lg">{orders?.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
