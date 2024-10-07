import React from "react";
import { Link } from "react-router-dom";

/**
 * A side bar component which renders a vertical navigation menu with links
 * to all the main pages of the app.
 *
 * The component is a 64px wide div with a dark gray background and white text,
 * and contains a header with the app name and a list of links divided by a
 * horizontal line.
 *
 * The links are to the home page (Cryptocurrency Table), the chart page
 * (Crypto Historical Chart), and the trending coins page (Trending Crypto
 * Coins).
 *
 * Each link is a list item with a padding of 2px and a hover effect that
 * changes the background color to a lighter gray.
 */
const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-auto">
      <div className="p-4 text-lg font-bold">Crypto BI Dashboard</div>
      <nav className="flex-grow">
        <ul className="divide-y divide-gray-700">
          <li className="p-2 hover:bg-gray-700">
            <Link to="/">Cryptocurrency Table</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/chart">Crypto Historical Chart</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/trendings">Trending Crypto Coins</Link>
          </li>
        </ul>
      </nav>
    </div>  );
};

export default Sidebar;