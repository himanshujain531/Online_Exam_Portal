import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate function
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Extract the active section from the URL
  const activeSection = new URLSearchParams(location.search).get('section');

  // Check if the user is logged in (has a token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to access the dashboard');
      navigate('/StudentLogin'); // Redirect to login if no token found
    } else {
      // Optional: Retrieve and use student data if needed
      const student = JSON.parse(localStorage.getItem('student'));
      console.log("Logged-in student:", student);
    }
  }, [navigate]);
  

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = () => {
    setIsMenuOpen(false); // Close the menu when an option is clicked
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      // Make a GET request to the logout API
      await axios.get('/api/student/logout');
      toast.success('Logged out successfully!');
      localStorage.removeItem('token'); // Clear the token from localStorage
      navigate('/StudentLogin'); // Redirect to login page
    } catch (error) {
      toast.error('Failed to log out!');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="?section=dashboard" className="text-lg font-bold">
          Online Exam System
        </Link>

        {/* Toggle Button for Small Screens */}
        <button
          onClick={handleMenuClick}
          className="sm:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:flex sm:space-x-4 absolute sm:static top-14 left-0 w-full bg-gray-800 sm:w-auto sm:flex-row`}
        >
          <Link
            to="?section=subject"
            className={`block px-4 py-2 hover:text-gray-300 ${
              activeSection === 'subject' ? 'text-blue-300' : ''
            }`}
            onClick={handleOptionClick}
          >
            Subject
          </Link>
          <Link
            to="?section=my-result"
            className={`block px-4 py-2 hover:text-gray-300 ${
              activeSection === 'my-result' ? 'text-blue-300' : ''
            }`}
            onClick={handleOptionClick}
          >
            My Result
          </Link>
          <Link
            to="?section=profile"
            className={`block px-4 py-2 hover:text-gray-300 ${
              activeSection === 'profile' ? 'text-blue-300' : ''
            }`}
            onClick={handleOptionClick}
          >
            Profile
          </Link>
          <button
            className="block px-4 py-2 hover:text-gray-300 w-full text-left sm:w-auto"
            onClick={handleLogout} // Logout when clicked
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="p-4">
        {activeSection === 'dashboard' && (
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        )}
        {activeSection === 'subject' && (
          <h1 className="text-2xl font-bold">Subject Section</h1>
        )}
        {activeSection === 'my-result' && (
          <h1 className="text-2xl font-bold">My Result Section</h1>
        )}
        {activeSection === 'profile' && (
          <h1 className="text-2xl font-bold">Profile Section</h1>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
