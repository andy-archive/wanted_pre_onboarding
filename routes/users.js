const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.js");

router.post("/", userController.addUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
