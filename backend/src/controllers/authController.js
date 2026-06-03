const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const validationError = validateUserInput({ name, email, password, address });

    if (validationError) {
      return res.status(400).json({
        message: validationError,
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

const getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed",
    user: req.user
  });
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
  return res.status(400).json({
    message: "Current password and new password are required",
  });
}

const validationError = validatePasswordOnly(newPassword);

if (validationError) {
  return res.status(400).json({
    message: validationError,
  });
}

    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    const user = users[0];

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.promise().query(
      "UPDATE users SET password=? WHERE id=?",
      [hashedPassword, userId]
    );

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

const {
  validateUserInput,
  validatePasswordOnly,
} = require("../utils/validators");

module.exports = {
    register,
    login,
    getProfile,
    changePassword,
};