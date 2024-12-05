import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import AdminProfile from '../../assets/images/AdminProfile.jpg';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";


export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate=useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/admin-sign-in'); // Redirect to login if not authenticated
        }
      }, [isAuthenticated, navigate]);

   
    const handleSignOut = async () => {
        try {
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
      
          if (data.success === false) {
            toast.error(`Error: ${data.message}`);
            return;
          }
      
          // Clear authentication state from localStorage
          localStorage.removeItem('isAuthenticated');
          toast.success('Successfully logged out!'); // Show success toast
          navigate('/admin-sign-in'); // Navigate to the login page after logout
        } catch (error) {
          toast.error(`Error: ${error.message}`);
        }
      };
      
    
    return (
        <>
            {/* Header */}
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                {/* Left Section: Logout */}
                <div className="flex items-center space-x-4">
                    <span onClick={handleSignOut} className="cursor-pointer hover:text-red-300">
                        Logout
                    </span>
                </div>

                {/* Center Section: Title */}
                <div className="text-2xl font-bold">
                    <h3>Online Exam System</h3>
                </div>

                {/* Right Section: Hamburger Menu */}
                <button
                    className="lg:hidden p-2 bg-gray-800 text-white rounded-full"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
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
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 z-10 w-64 h-screen bg-gray-700 text-white p-4 transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform lg:transform-none lg:static lg:w-1/4`}
                >
                    <div className="flex justify-center mb-4">
                        <img
                            src={AdminProfile}
                            alt="Admin"
                            className="w-20 h-20 rounded-full border-2 border-gray-500"
                        />
                    </div>

                    <div className="space-y-4">
                    <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Dashboard
                        </Link>
                        <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Subject
                        </Link>
                        <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Exam
                        </Link>
                        <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Question
                        </Link>
                        <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Result
                        </Link>
                        <Link className="block bg-gray-600 p-2 rounded hover:bg-gray-500 text-center">
                            Student List
                        </Link>
                    </div>
                </div>

                {/* Main Section */}
                <div className="w-full lg:w-3/4 p-6 bg-gray-100">
                    <h2 className="text-3xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
                    <p className="text-gray-700">
                        Use the navigation menu to manage exams, questions, and view results.
                    </p>
                </div>
            </div>
        </>
    );
}
