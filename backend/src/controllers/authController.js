const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO users 
           (name, email, password, address, role)
           VALUES (?, ?, ?, ?, ?)`,
          [name, email, hashedPassword, address, "USER"],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.status(201).json({
              message: "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        role: user.role,
      });
    }
  );
};

module.exports = {
    register,
    login
};