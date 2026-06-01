const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  
  getDashboard

);

module.exports = router;