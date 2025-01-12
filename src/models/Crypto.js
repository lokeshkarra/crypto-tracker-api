const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  coinId: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  marketCap: {
    required: true,
    type: Number,
  },
  change24h: {
    required: true,
    type: Number,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
