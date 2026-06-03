const db = require("../config/db");

const {
    validateRating,
  } = require("../utils/validators");

const getAllStores = async (req, res) => {
  try {
    const [stores] = await db.promise().query(`
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        ROUND(AVG(r.rating),2) AS overallRating
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      GROUP BY s.id
    `);

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json(error);
  }
};

const submitRating = async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      store_id,
      rating
    } = req.body;

    if (!store_id) {
      return res.status(400).json({
        message: "Store is required",
      });
    }

    const validationError = validateRating(rating);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    await db.promise().query(
      `
      INSERT INTO ratings
      (user_id, store_id, rating)
      VALUES (?, ?, ?)
      `,
      [user_id, store_id, rating]
    );

    res.status(201).json({
      message: "Rating submitted successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRating = async (req, res) => {
  try {
    const ratingId = req.params.id;

    const { rating } = req.body;

    const validationError = validateRating(rating);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    await db.promise().query(
      `
      UPDATE ratings
      SET rating = ?
      WHERE id = ?
      `,
      [rating, ratingId]
    );

    res.status(200).json({
      message: "Rating updated successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};
    
module.exports = {
  getAllStores,
  submitRating,
  updateRating,
};


