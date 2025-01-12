const axios = require("axios");
const Crypto = require("../models/Crypto");

const fetchCryptoData = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const params = {
    vs_currency: "usd",
    ids: "bitcoin,matic-network,ethereum",
  };

  try {
    const { data } = await axios.get(url, { params });

    const extractedData = data.map((coin) => ({
      coinId: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
    }));

    await Crypto.insertMany(extractedData);

    console.log("Crypto data fetched and stored successfully.");
  } catch (err) {
    console.error("Error fetching crypto data:", err.message);
  }
};

module.exports = fetchCryptoData;
