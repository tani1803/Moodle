const { success } = require("../utils/apiResponse");

exports.getUsers = async (req, res, next) => {
  try {
    return success(res, "Users fetched", []);
  } catch (err) {
    next(err);
  }
};