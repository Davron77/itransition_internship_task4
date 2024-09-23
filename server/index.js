// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { admin, db } = require("./firebase");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Example route to get user data
app.get("/users", async (req, res) => {
  console.log(`Hello`);
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to block users by updating their status to 'blocked' in Firestore
app.post("/block-users", async (req, res) => {
  const { userIds } = req.body;

  console.log("userIds", userIds);

  if (!Array.isArray(userIds)) {
    return res.status(400).send("Invalid data format");
  }

  try {
    const updatePromises = userIds.map(async (id) => {
      const userRef = db.collection("users").doc(id); // Firestore reference to the user doc
      await userRef.update({ status: "blocked" }); // Update the user's status to 'blocked'
    });

    await Promise.all(updatePromises); // Wait for all users to be updated
    res.status(200).send("Users successfully blocked");
  } catch (error) {
    console.error("Error blocking users:", error);
    res.status(500).send("Error blocking users");
  }
});

// Route to unblock users by updating their status to 'active' in Firestore
app.post("/unblock-users", async (req, res) => {
  const { userIds } = req.body;

  console.log("userIds", userIds);

  if (!Array.isArray(userIds)) {
    return res.status(400).send("Invalid data format");
  }

  try {
    const updatePromises = userIds.map(async (id) => {
      const userRef = db.collection("users").doc(id); // Firestore reference to the user doc
      await userRef.update({ status: "active" }); // Update the user's status to 'active'
    });

    await Promise.all(updatePromises); // Wait for all users to be updated
    res.status(200).send("Users successfully unblocked");
  } catch (error) {
    console.error("Error unblocking users:", error);
    res.status(500).send("Error unblocking users");
  }
});

// Example route to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  //   console.log(`Deleting user with ID: ${userId}`);
  const userId = req.params.id; // Get the user ID from the request parameters

  try {
    // Step 1: Delete the user from Firebase Authentication
    await admin.auth().deleteUser(userId);
    console.log(`User with ID: ${userId} deleted from Firebase Authentication`);

    // Step 2 (Optional): Delete user data from Firestore
    await db.collection("users").doc(userId).delete();
    console.log(`User with ID: ${userId} deleted from Firestore`);

    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user: " + error.message);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
