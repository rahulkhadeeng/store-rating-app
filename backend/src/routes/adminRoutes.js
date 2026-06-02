const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  createUser,
  createStore,
  getStores,
} = require("../controllers/adminController");


router.post(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  createStore
);


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

router.get(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  getStores
);

module.exports = router;