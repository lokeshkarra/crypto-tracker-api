const Crypto = require("../models/Crypto");

exports.getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter: coin" });
  }

  try {
    // Fetch the latest entry for the requested coin
    const latestData = await Crypto.findOne({ coinId: coin })
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .exec();

    if (!latestData) {
      return res
        .status(404)
        .json({ error: "No data found for the requested coin" });
    }

    // Structure the response
    const response = {
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
