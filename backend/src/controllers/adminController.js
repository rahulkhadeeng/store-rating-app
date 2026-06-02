const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const [existing] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES (?,?,?,?,?)`,
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const [users] = await db.promise().query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [stores] = await db.promise().query(
      "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [ratings] = await db.promise().query(
      "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    res.status(200).json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getDashboard,
  createUser,
};