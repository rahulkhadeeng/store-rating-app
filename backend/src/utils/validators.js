const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(password);
};

const validateUserInput = ({ name, email, password, address }) => {
  if (!name || !email || !password || !address) {
    return "All fields are required";
  }

  if (name.length < 20 || name.length > 60) {
    return "Name must be between 20 and 60 characters";
  }

  if (address.length > 400) {
    return "Address must be maximum 400 characters";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format";
  }

  if (!isValidPassword(password)) {
    return "Password must be 8-16 characters and include at least one uppercase letter and one special character";
  }

  return null;
};

const validatePasswordOnly = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (!isValidPassword(password)) {
    return "Password must be 8-16 characters and include at least one uppercase letter and one special character";
  }

  return null;
};

const validateStoreInput = ({ name, email, address }) => {
  if (!name || !email || !address) {
    return "Name, email and address are required";
  }

  if (name.length < 20 || name.length > 60) {
    return "Name must be between 20 and 60 characters";
  }

  if (address.length > 400) {
    return "Address must be maximum 400 characters";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format";
  }

  return null;
};

const validateRating = (rating) => {
  const numericRating = Number(rating);

  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return "Rating must be an integer between 1 and 5";
  }

  return null;
};

module.exports = {
  validateUserInput,
  validatePasswordOnly,
  validateStoreInput,
  validateRating,
};