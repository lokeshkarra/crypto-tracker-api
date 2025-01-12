const Crypto = require("../models/Crypto");
const { calculateStandardDeviation } = require("../utils/calculateDeviation");

exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin)
    return res.status(400).json({ error: "Coin parameter is required." });

  const records = await Crypto.find({ coinId: coin })
    .sort({ timestamp: -1 })
    .limit(100);

  if (!records)
    return res
      .status(404)
      .json({ error: "No data found for the requested coin." });

  const prices = records.map((record) => record.price);
  const deviation = calculateStandardDeviation(prices);

  res.json({ deviation });
};
