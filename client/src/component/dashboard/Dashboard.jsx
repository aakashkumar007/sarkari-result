import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Dashboard.css';
import DashboardMenu from '../dashboardMenu/DashboardMenu';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user and related data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
     toast.success("LOGOUT SUCCESS")
    navigate('/signin'); // Redirect to sign-in page
  };

  return (
    <div className="dashboard-container min-h-screen">
      <div className="logout-button-container">
        <motion.button
          onClick={handleLogout}
          className="logout-button"
          whileHover={{ scale: 1.05, backgroundColor: '#d32f2f' }}
          transition={{ duration: 0.3 }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          Logout
        </motion.button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardMenu />
    </div>
  );
};

export default Dashboard;
