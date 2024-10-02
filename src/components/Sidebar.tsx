import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col h-auto">
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