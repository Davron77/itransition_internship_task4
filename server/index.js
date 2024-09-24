// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { admin, db } = require("./firebase");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Login

app.post("/login", async (req, res) => {
  const { idToken } = req.body; // Get the token from the request body

  if (!idToken) {
    return res.status(400).send("No token provided");
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Token is valid, you can extract user information like uid
    const uid = decodedToken.uid;

    // Optionally, fetch user data from Firestore (or wherever you're storing it)
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    if (userData?.status === "blocked") {
      console.log("blocked, blocked");
      // User data not found in Firestore
      return res.status(400).send({
        code: 400,
        message: "Your account has been blocked",
      });
    }

    // Generate a custom token for the user
    const token = await admin.auth().createCustomToken(uid);

    // Respond with success and user data
    res.status(200).json({
      message: "Login successful",
      token,
      email: userData?.email, // You can return user data from Firestore if needed
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Unauthorized: Invalid token");
  }
});

// Register

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body; // Get the user data from the request body

  if (!email || !password || !username) {
    return res.status(400).send("Email, password, and username are required");
  }

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username, // Use the username as the displayName
    });

    // Get the user metadata (creation and last sign-in times)
    const user = await admin.auth().getUser(userRecord.uid);

    // After creating the user, save additional details in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      name: username,
      email: userRecord.email,
      created_at: user.metadata.creationTime, // Store account creation time
      last_login_at: user.metadata.lastSignInTime, // Store last login time (initially the same as creation time)
      status: "active", // Default status for new users
    });

    // Generate a custom token for the user
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      email: userRecord.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error registering user: " + error.message);
  }
});

// Get users

app.get("/users", async (req, res) => {
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
  const userId = req.params.id; // Get the user ID from the request parameters

  try {
    // Step 1: Delete the user from Firebase Authentication
    await admin.auth().deleteUser(userId);

    // Step 2 (Optional): Delete user data from Firestore
    await db.collection("users").doc(userId).delete();

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
