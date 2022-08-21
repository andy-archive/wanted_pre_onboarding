const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const User = db.User;

const addUser = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const info = {
      userId: uuidv4(),
      name,
      phoneNumber,
    };
    const existUser = await User.findOne({ where: { phoneNumber: phoneNumber } });
    if (existUser) {
      return res.status(400).json({ Error: "User already exists." });
    }
    const isPhoneNumber = asValue => {
      const regExp = /^\d{3}-\d{3,4}-\d{4}$/;
      return regExp.test(asValue);
    };
    if (!isPhoneNumber(phoneNumber)) {
      return res.status(400).json({ Error: "Not valid phone number." });
    }
    const user = await User.create(info);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { userId: userId } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await User.update(req.body, { where: { userId: userId } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { userId: userId } });
      return res.status(200).json(updatedUser);
    }
    throw new Error("User not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { userId: userId } });
    if (deleted) {
      return res.status(200).json({ Message: "User deleted." });
    }
    throw new Error("User not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
