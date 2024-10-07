import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./LineChart";

interface CoinMap {
  id: string;
  name: string;
}

interface ChartData {
  x: string;
  y: Number;
}

/**
 * This component fetches a list of coins from the API and renders a dropdown
 * allowing the user to select a coin. Additionally, it fetches the market data
 * for the selected coin and renders a line chart with the data.
 *
 * The component remembers the user's selection and updates the line chart
 * accordingly whenever the user selects a different coin or changes the time
 * period.
 *
 * @returns {JSX.Element} The CoinChart component
 */
const CoinChart: React.FC = (): JSX.Element => {
  const [selectedCoinId, setSelectedCoinId] = useState<string>("bitcoin");
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [coinIdMap, setCoinIdMap] = useState<CoinMap[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // TODO: move this to a separate api service and check how to refactor the two useEffects
  useEffect(() => {
    const fetchCoinIdMap = async () => {
      const { data } = await axios.get<CoinMap[]>(
        "http://localhost:8080/api/v1/coins-list"
      );
      setCoinIdMap(data);
    };
    fetchCoinIdMap();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      const { data } = await axios.get<ChartData[]>(
        `http://localhost:8080/api/v1/coins-market-chart/${selectedCoinId}`,
        {
          params: { daysBefore: selectedDays },
        }
      );
      setChartData(data);
    };
    fetchChartData();
  }, [selectedCoinId, selectedDays]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">
          Select a coin:
          <select
            onChange={(e) => setSelectedCoinId(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
            defaultValue="bitcoin"
          >
            <option value="bitcoin">Bitcoin</option>
            {coinIdMap.map(
              (coin) =>
                coin.id !== "bitcoin" && (
                  <option key={coin.id} value={coin.id}>
                    {coin.name}
                  </option>
                )
            )}
          </select>
        </label>

        <label className="block mb-2">
          Choose the time period:
          <select
            onChange={(e) => setSelectedDays(parseInt(e.target.value))}
            className="block w-full px-4 py-2 border rounded-md"
            defaultValue="7"
          >
            <option value="7">Past 7 Days</option>
            <option value="14">Past 14 Days</option>
            <option value="20">Past 20 Days</option>
            <option value="30">Past 30 Days</option>
          </select>
        </label>
      </div>
      <LineChart chartPoints={chartData} />
    </div>
  );
};

export default CoinChart;
