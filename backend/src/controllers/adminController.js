const db = require("../config/db");

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
};