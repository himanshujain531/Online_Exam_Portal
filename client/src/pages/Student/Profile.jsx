import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const studentData = JSON.parse(localStorage.getItem("student"));
        const studentId = studentData?.id;

        if (!token || !studentId) {
          toast.error("Missing authentication or user data!");
          return;
        }

        const response = await axios.get(`/api/student/details/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = response.data.data;
        setStudent(profileData);
        setFormData({
          name: profileData.name,
          email: profileData.email,
        });
      } catch (error) {
        toast.error("Failed to fetch profile data!");
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!student) {
      toast.error("No student data available to update!");
      return;
    }

    const studentId = student._id;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `/api/student/update/${studentId}`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStudent(response.data.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Profile
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
