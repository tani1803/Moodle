const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

router.post("/create", courseController.createCourse);
router.get("/", courseController.getCourses);

module.exports = router;