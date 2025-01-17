import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("/api/student/login", {
        email,
        password,
      });

      // Store token and student data in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store the token
        localStorage.setItem("student", JSON.stringify(response.data.student)); // Optional: Store student data
        toast.success("Login Successful!");
        setTimeout(() => navigate("/Student?section=dashboard"), 2000); // Redirect to dashboard
      } else {
        toast.error("No token received from server!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer"
            >
              Register here
            </span>
          </p>
{/* Go Back Button */}
<div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline text-sm"
            >
              Go Back to Home
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default StudentLogin;
