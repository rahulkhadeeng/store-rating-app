const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getAllStores,
  submitRating,
  updateRating,
} = require("../controllers/userController");

router.get(
  "/stores",
  verifyToken,
  getAllStores
);

router.post(
  "/ratings",
  verifyToken,
  submitRating
);

router.put(
  "/ratings/:id",
  verifyToken,
  updateRating,
);

module.exports = router;