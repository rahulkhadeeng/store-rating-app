const db = require("../config/db");

const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [result] = await db.promise().query(`
      SELECT
        s.id,
        s.name,
        ROUND(AVG(r.rating),2) AS averageRating
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY s.id
    `, [ownerId]);

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json(error);
  }
};

const getStoreRatings = async (req, res) => {
  try {

    const ownerId = req.user.id;

    const [ratings] = await db.promise().query(`
      SELECT
        u.id,
        u.name,
        u.email,
        r.rating
      FROM ratings r
      JOIN users u
      ON r.user_id = u.id
      JOIN stores s
      ON r.store_id = s.id
      WHERE s.owner_id = ?
    `, [ownerId]);

    res.status(200).json(ratings);

  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getOwnerDashboard,
  getStoreRatings,
};