const express = require("express");
const router = express.Router();

const { test, getMyPlacementRole } = require("../controllers/placement.controller");
const { protect } = require("../middlewares/auth.middleware");

// Public — just to test module is working
router.get("/test", test);

// Protected — returns placement role of logged in user
router.get("/me", protect, getMyPlacementRole);

module.exports = router;
