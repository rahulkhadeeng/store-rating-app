
const register = (req, res) => {
    res.status(200).json({
        message: "Register API Working"
    });
};

const login = (req, res) => {
    res.status(200).json({
        message: "Login API Working"
    });
};

module.exports = {
    register,
    login
};