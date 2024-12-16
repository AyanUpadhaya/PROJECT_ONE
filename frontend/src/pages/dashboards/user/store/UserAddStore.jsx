import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";

const UserAddStore = () => {
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    location: "",
    description: "",
  });
 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance with base URL and Authorization header
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      name: storeDetails.name,
      location: storeDetails.location,
      description: storeDetails.description,
    }));

    try {
      // Replace with your API endpoint
      const response = await axiosInstance.post("/stores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Store created successfully!");
      console.log(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create store."
      );
      console.error(error);
    }
  };

  return (
    <div className="container mt-2">
      <h2>Create Store</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={storeDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={storeDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={storeDetails.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
       
        <button type="submit" className="btn btn-primary">
          Create Store
        </button>
      </form>
    </div>
  );
};

export default UserAddStore;
