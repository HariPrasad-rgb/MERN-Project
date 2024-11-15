const express = require("express");
const mongoose = require("mongoose");
const { User, UserHistory } = require("../models/userModel"); // Adjust the path as needed
const router = express.Router();

//create
router.post("/createuser", async (req, res) => {
  //way to get value
  // var name = req.body.name;

  // destructuring body
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res
      .status(201)
      .json({ message: "User created successfully", data: userAdded });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.patch("/restore-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const restoredUser = await User.findByIdAndUpdate(
      id,
      { deletedAt: null },
      { new: true }
    );
    if (!restoredUser) {
      return res
        .status(404)
        .json({ error: "User not found or already active" });
    }
    res
      .status(200)
      .json({ message: "User restored successfully", data: restoredUser });
  } catch (error) {
    console.error("Error restoring user:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/userlist", async (req, res) => {
  try {
    // Find users where deletedAt is null (i.e., not soft deleted)
    const allUsers = await User.find({ deletedAt: null });
    res.status(200).json({ data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/userdetails/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await User.findById({ _id: id });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and update the deletedAt field
    const userData = await User.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true } // This option returns the updated document
    );

    if (userData) {
      res
        .status(200)
        .json({ message: "User soft deleted successfully", data: userData });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Get user version history
router.get("/userhistory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find all versions of the user's history, sorted by versionNumber
    const history = await UserHistory.find({ userId: id }).sort({
      versionNumber: -1,
    });

    if (history.length === 0) {
      return res
        .status(404)
        .json({ error: "No version history found for this user" });
    }

    res.status(200).json({ data: history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    // Find the existing user data
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save the current user state to UserHistory for versioning
    const versionCount = await UserHistory.countDocuments({
      userId: existingUser._id,
    });
    await UserHistory.create({
      userId: existingUser._id,
      versionNumber: versionCount + 1,
      data: existingUser.toObject(), // Save the current state of the user
      modifiedAt: new Date(),
    });

    // Update the user with the new data
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get list of soft-deleted users
router.get("/deleted-users", async (req, res) => {
  try {
    // Find users where deletedAt is not null (i.e., soft-deleted users)
    const deletedUsers = await User.find({ deletedAt: { $ne: null } });

    if (deletedUsers.length === 0) {
      return res.status(404).json({ message: "No deleted users found" });
    }

    res.status(200).json({ data: deletedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/permanently-delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User permanently deleted", data: deletedUser });
  } catch (error) {
    console.error("Error permanently deleting user:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
