const { db } = require("../utils/db");
const { validateUser } = require("../models/User");

// Create user
const createUser = async (userData) => {
  try {
    // Validasi data
    validateUser(userData);

    // Rand Id
    const userRef = db.collection("users").doc();

    await userRef.set({
      name: userData.name,
      password: userData.password,
    });

    console.log("User berhasil dibuat.");

    return {
      id: userRef.id,
      ...userData,
    };
  } catch (error) {
    console.log("Craete user error", error.message);
  }
};

// Get Users by name
const searchUsers = async (name) => {
  try {
    // const snapshot = db
    //   .collection("users")
    //   .where("name", ">=", name)
    //   .where("name", "<=", `${name}\uf8ff`);
    // const users = await snapshot.get();

    // if (users.empty) {
    //   throw new Error("User tidak ditemukan!");
    // }
    // users.forEach((user) => {
    //   console.log({
    //     id: user.id,
    //     ...user.data(),
    //   });
    // });

    const snapshot = await db.collection("users").get();
    const getUsers = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((user) => user.name?.toLowerCase().includes(name.toLowerCase()));

    if (getUsers.length === 0) {
      throw new Error("User tidak ditemukan");
    }
    return getUsers;
  } catch (error) {
    console.log("Error", error.message);
  }
};

// Get all user
const getUsers = async () => {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));

    return users;
  } catch (error) {
    console.log("User tidak ditemukan", error.message);
  }
};

// Update user
const updateUser = async (name, newName) => {
  try {
    // Get specific user data
    const snapshot = await db
      .collection("users")
      .where("name", "==", name)
      .get();

    if (snapshot.empty) {
      throw new Error("User tidak ada");
    }

    // getId
    const getId = snapshot.docs[0];

    // User updated
    await db.collection("users").doc(getId.id).update({
      name: newName,
      // password: getId.pasword,
    });

    console.log("User berhasil di update");

    return {
      id: getId.id,
      name: getId.data().name,
      password: getId.data().password,
    };
  } catch (error) {
    throw new Error("Failed");
  }
};

module.exports = { createUser, searchUsers, getUsers, updateUser };
