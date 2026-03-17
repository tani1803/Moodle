const authService = require("../services/auth.service");
const { success } = require("../utils/apiResponse");

exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    return success(res, "User registered", data);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    return success(res, "Login successful", data);
  } catch (err) {
    next(err);
  }
};