const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;