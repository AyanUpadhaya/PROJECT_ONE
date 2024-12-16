const Store = require("./Store");
const User = require("../user/User");

// Create a new store
const createStore = async (req, res) => {
  try {
    const { name, location, description, created_by } = JSON.parse(
      req.body.data
    );

    // Fetch user from the request
    const user = await User.findById(created_by);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new store
    const store = await Store.create({
      name,
      location,
      description,
      created_by,
    });
    if (user.is_store_owner){
      return res.status(400).json({message:"You already have a store",data:user})
    }
      // Update the user's `store_id`
    user.store_id = store._id;
    user.is_store_owner = true; // Ensure this is set to true
    await user.save();

    res.status(201).json({
      message: "Store created successfully.",
      data: store,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create store.", error: error.message });
  }
};

const testRouteController = async (req, res) => {
  try {
    // Check if required form data exists (if applicable)
    if (!req.body.data) {
      return res.status(400).send("Missing required data field: data");
    }

    const reqBody = JSON.parse(req?.body?.data);
    console.log(reqBody);
    res.send("Ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("created_by", "name email"); // Populate user details if needed
    res.status(200).json(stores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stores.", error: error.message });
  }
};

// Get a store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate(
      "created_by",
      "name email"
    );
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }
    res.status(200).json(store);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch store.", error: error.message });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Ensure the user deleting the store is the owner
    if (store.created_by.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this store." });
    }

    // Check if the store has associated books
    if (store.book_ids.length > 0) {
      return res
        .status(400)
        .json({ message: "Store contains books and cannot be deleted." });
    }

    // Delete the store
    await Store.findByIdAndDelete(req.params.id);

    // Reset the user's `store_id` and `is_store_owner` fields
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { store_id: 1 },
      is_store_owner: false,
    });

    res.status(200).json({ message: "Store deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete store.", error: error.message });
  }
};

// Get all stores created by the user
const getUserStores = async (req, res) => {
  try {
    const stores = await Store.find({ created_by: req.user._id });

    if (stores.length === 0) {
      return res
        .status(404)
        .json({ message: "No stores found for this user." });
    }

    res.status(200).json({
      message: "Stores fetched successfully.",
      stores,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stores.", error: error.message });
  }
};

// Update store details
const updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const reqBody = req.body;

    // Find the store by ID
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Ensure the user updating the store is the owner
    if (store.created_by.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this store." });
    }

    const updatedStore = await Store.findByIdAndUpdate(storeId, reqBody, {
      new: true,
    });

    res.status(200).json({
      message: "Store updated successfully.",
      data: updatedStore,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update store.", error: error.message });
  }
};

// Like or Unlike a store
const toggleLikeStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const userId = req.user._id;

    // Find the store by ID
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Check if the user has already liked the store
    const isLiked = store.liked_by.includes(userId);

    if (isLiked) {
      // Remove the user's like (unlike)
      store.liked_by = store.liked_by.filter(
        (user) => user.toString() !== userId.toString()
      );
      await store.save();
      return res.status(200).json({ message: "Store unliked successfully." });
    } else {
      // Add the user's like
      store.liked_by.push(userId);
      await store.save();
      return res.status(200).json({ message: "Store liked successfully." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to toggle like status.", error: error.message });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  getUserStores,
  updateStore,
  toggleLikeStore,
  testRouteController,
};
