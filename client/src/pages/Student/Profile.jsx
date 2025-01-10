import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });
  const [previewPhoto, setPreviewPhoto] = useState("");

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
        setPreviewPhoto(profileData.photo);
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    setPreviewPhoto(URL.createObjectURL(file));
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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const response = await axios.put(
        `/api/student/update/${studentId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Profile
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white p-6 shadow rounded-lg"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
          {previewPhoto && (
            <img
              src={previewPhoto}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Profile
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Profile;
