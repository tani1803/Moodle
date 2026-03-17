const courseService = require("../services/course.service");
const { success } = require("../utils/apiResponse");

exports.createCourse = async (req, res, next) => {
  try {
    const data = await courseService.createCourse(req.body);
    return success(res, "Course created", data);
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const data = await courseService.getCourses();
    return success(res, "Courses fetched", data);
  } catch (err) {
    next(err);
  }
};