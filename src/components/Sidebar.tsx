import React from "react";
import { Link } from "react-router-dom";

/**
 * A side navigation bar that contains links to the main pages of the Crypto BI app.
 *
 * The sidebar is a 64px wide vertical bar that is divided into two sections: a title and a navigation section.
 * The title displays the name "Crypto BI Dashboard" in a large font.
 * The navigation section contains three links: "Cryptocurrency Table", "Crypto Historical Chart", and "Trending Crypto Coins".
 * Each link is displayed as a list item with a hover effect.
 */
const Sidebar: React.FC = () => {
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