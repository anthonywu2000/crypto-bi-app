import React, { useState, useEffect } from "react";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: Number;
  market_cap: Number;
  price_change_percentage_24h: Number;
  market_cap_change_percentage_24h: Number;
}

const CoinTable: React.FC = (): JSX.Element => {
  const [coins, setCoins] = useState<Coin[]>([]);
  // for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage, setCoinsPerPage] = useState<number>(20);

  const totalPages = Math.ceil(coins.length / coinsPerPage);

  // TODO: create a separate service for this api call
  useEffect(() => {
    const fetchCoinMarkets = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/coin-markets"
      );
      setCoins(data);
    };
    fetchCoinMarkets();
  }, []);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  // slice the coins array to only include the coins for the current page
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-indigo-400 rounded-lg shadow-lg h-auto w-auto">
        <h1 className="text-3xl font-bold p-4">
          Cryptocurrency Price as of{" "}
          {new Intl.DateTimeFormat("en-CA").format(new Date())}
        </h1>
        <p className="px-4 py-2 text-base">
          The table displays the current price for the top 750 cryptocurrency
          coins available in the market. We only show the top 750 coins due to
          CoinGecko's free-tier API rate limit.<br></br>
          The information for each coin is refreshed for every 30 minutes and
          does not reflect on real time data due to API rate limits.
        </p>

        <table className="table-auto w-full bg-white">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2">Coin Image</th>
              <th className="px-4 py-2">Coin Name</th>
              <th className="px-4 py-2">Current Price (in USD)</th>
              <th className="px-4 py-2">Market Cap (in USD)</th>
              <th className="px-4 py-2">Price Change Percentage in 24hr</th>
              <th className="px-4 py-2">
                Market Cap Change Percentage in 24hr
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentCoins.map((coin, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
                key={coin.id}
              >
                <td className="px-4 py-2 items-center justify-center">
                  <img src={coin.image} alt="Image" className="w-8 h-8" />
                </td>
                <td className="px-4 py-2 text-center">{coin.name}</td>
                <td className="px-4 py-2 text-center">
                  {coin.current_price
                    ? "$" + coin.current_price?.toFixed(2).toString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {coin.market_cap
                    ? "$" +
                      (+coin.market_cap / 10000000000).toLocaleString("en-US", {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      }) +
                      "M"
                    : "N/A"}
                </td>
                <td
                  className={`${
                    +coin.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-600"
                  } px-4 py-2 font-bold text-center`}
                >
                  {coin.price_change_percentage_24h
                    ? coin.price_change_percentage_24h.toFixed(3)?.toString() +
                      "%"
                    : "N/A"}
                </td>
                <td
                  className={`${
                    +coin.market_cap_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-600"
                  } px-4 py-2 font-bold text-center`}
                >
                  {coin.market_cap_change_percentage_24h
                    ? coin.market_cap_change_percentage_24h
                        .toFixed(3)
                        ?.toString() + "%"
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="flex justify-between">
                  <button
                    className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <span className="flex items-center">
                    Page
                    <select
                      className="mx-2 bg-white border border-gray-300 rounded-md"
                      value={currentPage}
                      onChange={(e) => setCurrentPage(+e.target.value)}
                    >
                      {Array.from({ length: totalPages }, (_, i) => ( // i starting from 0 // pagination of totalPages
                        // returned for each page number
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    of {totalPages}
                  </span>

                  <button
                    className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
