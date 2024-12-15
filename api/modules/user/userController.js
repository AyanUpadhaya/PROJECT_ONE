const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

//user registration
const register = async (req, res, next) => {
  const reqBody = req.body;
  const { email } = reqBody;
  const user = await User.findOne({ email });

  if (!user) {
    const hashPassword = bcrypt.hashSync(password, 10);
    const result = await User.create({ email, password: hashPassword, role });
    if (result) {
      const userObject = result.toObject();
      delete userObject.password;
      return res
        .status(201)
        .json({ message: "Registration Successfull", data: userObject });
    }
  } else {
    return res.status(400).json({ message: "Email already exists." });
  }
};

//user login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist." });
  } else {
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Email or Password!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        algorithm: "HS256",
        expiresIn: "30d",
      }
    );

    return res.status(200).send({
      message: "Login successfull",
      data: {
        _id: user._id,
        email: user.email,
        role: user.role,
        is_store_owner: user.is_store_owner,
        token: token,
      },
    });
  }
};

//update user details
const updateUserDetails = async (req, res) => {
  try {
    const { user_id } = req.params; // Assuming user_id is sent in params
    const updates = req.body; // Data to update

    const updatedUser = await User.findByIdAndUpdate(user_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user details", error: error.message });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
  }
};

//update photo
const updateProfilePicture = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Check if a file is provided for upload
    const [result, fileName] = await uploadToCloudinary(req);
    const newData = { photoUrl: result };
    const updatedUser = await User.findByIdAndUpdate(user_id, newData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Picture updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  register,
  login,
  changePassword,
  updateUserDetails,
  updateProfilePicture,
};
