const express = require("express");
const { getDeviation } = require("../controllers/deviationController");

const router = express.Router();
router.get("/deviation", getDeviation);

module.exports = router;
