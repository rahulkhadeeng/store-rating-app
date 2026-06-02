const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  createUser,
} = require("../controllers/adminController");


router.post(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  createUser
);

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  
  getDashboard

);

module.exports = router;