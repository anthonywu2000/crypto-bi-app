import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

interface ChartData {
  x: string;
  y: Number;
}

/**
 * A component that renders a line chart from a given list of chart points.
 *
 * Each chart point is an object with an `x` and a `y` property, where `x` is a
 * string and `y` is a number. The chart will render the `y` values as the points
 * on the line, with the `x` values as the labels on the x-axis.
 *
 * The chart will also display a tooltip with the y value formatted as a USD
 * price.
 *
 * @param {ChartData[]} chartPoints
 * @returns {JSX.Element}
 */
const LineChart: React.FC<{ chartPoints: ChartData[] }> = ({
  chartPoints,
}): JSX.Element => {
  const data = {
    labels: chartPoints.map((point: any) => point.x),
    datasets: [
      {
        label: "Price in USD",
        data: chartPoints.map((point: any) => point.y),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    reponsive: true,
    // TODO: add label axes
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `$${tooltipItem.formattedValue} USD`,
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
