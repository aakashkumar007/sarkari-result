// src/component/dashboard/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl p-2 underline">Menu</h1>
      <div className="space-y-4 border-2 p-4">
        <ul>
          <li>
            <Link
              to="/dashboard/add-job"
              className="text-indigo-600 hover:underline "
            >
              Add Job Listing
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/add-result"
              className="text-indigo-600 hover:underline "
            >
              Add results
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/add-admit-card"
              className="text-indigo-600 hover:underline "
            >
              Add Admit Cards
            </Link>
          </li>

          
        </ul>
        {/* Add more dashboard links as needed */}
      </div>
    </div>
  );
};

export default DashboardMenu;
