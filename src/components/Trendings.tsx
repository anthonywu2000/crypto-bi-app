import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrendingCoin {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  total_volume: string;
  market_cap: string;
  sparkline: string;
}

/**
 * Trendings Component
 *
 * This component fetches the top trending coins from the API and renders it
 * in a table. The table shows the coin's thumb, name, symbol, market cap rank,
 * total volume, market cap, and sparkline.
 *
 * The table is styled with Tailwind CSS classes to have a modern and clean
 * look. The rows are given alternating gray and white backgrounds to make
 * them stand out.
 *
 * @returns {TSX.Element} The Trendings component
 */
const Trendings: React.FC = () => {
  const [coins, setCoins] = useState<TrendingCoin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      {/* TODO: create a separate service for this api call */}
      const response = await axios.get(
        "http://localhost:8080/api/v1/search-trending"
      );
      setCoins(response.data);
    };
    fetchTrendingCoins();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 bg-green-200 rounded-lg shadow-lg h-auto w-auto">
        <h1 className="text-3xl font-bold p-4">Top Trending Coins</h1>
        <p className="px-4 py-2 text-base">
          This table shows the top 15 trending coins searched on the internet as
          of now, sorted by their market cap value.
        </p>

        <table className="table-auto w-full bg-white">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2">Coin Thumb</th>
              <th className="px-4 py-2">Coin Name</th>
              <th className="px-4 py-2">Coin Symbol</th>
              <th className="px-4 py-2">Market Cap Rank</th>
              {/* TODO: add custom tooltip for these two columns in tailwind */}
              <th className="px-4 py-2">Total Volume (in USD)</th>
              <th className="px-4 py-2">Market Cap (in USD)</th>
              <th className="px-4 py-2">Sparkline</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {coins.map((coin, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
                key={coin.id}
              >
                <td className="px-4 py-2">
                  <img src={coin.thumb} alt="Thumbnail" className="w-8 h-8" />
                </td>
                <td className="px-4 py-2">{coin.name}</td>
                <td className="px-4 py-2">{coin.symbol}</td>
                <td className="px-4 py-2">{coin.market_cap_rank}</td>
                <td className="px-4 py-2">{coin.total_volume}</td>
                <td className="px-4 py-2">{coin.market_cap}</td>
                <td className="px-4 py-2">
                  <img
                    src={coin.sparkline}
                    alt="Sparkline"
                    className="w-full h-5"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trendings;