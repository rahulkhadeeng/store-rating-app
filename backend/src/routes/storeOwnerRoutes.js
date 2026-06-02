const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getOwnerDashboard,
  getStoreRatings,
} = require("../controllers/storeOwnerController");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("STORE_OWNER"),
  getOwnerDashboard
);

router.get(
  "/ratings",
  verifyToken,
  authorizeRoles("STORE_OWNER"),
  getStoreRatings
);

module.exports = router;