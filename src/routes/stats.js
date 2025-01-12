const express = require("express");

const router = express.Router();
const { getStats } = require("../controllers/statsController");

// API endpoint
router.get("/stats", getStats);

module.exports = router;
