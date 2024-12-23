import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export default function UpdateProfile() {
  const [currentUser, setCurrentUser] = useState(null); // Hold logged-in admin data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate("/admin-sign-in");
    } else {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser); // Parse and set the user data
        setFormData({
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          password: parsedUser.password || ""
        });
      } else {
        toast.error("No user data found.");
        navigate("/admin-sign-in"); // Redirect to login if no user data is found
      }
    }
  }, [isAuthenticated, navigate]); // Only run if isAuthenticated or navigate changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?._id) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      toast.info("Updating profile...");
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token is missing.");
        navigate("/admin-sign-in");
        return;
      }

      const res = await fetch(`/api/admin/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if required
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to update profile.");
        return;
      }

      const data = await res.json();

      toast.success("Profile updated successfully!");
      // Update localStorage with new user data
      const updatedUser = { ...currentUser, ...formData };
      setCurrentUser(updatedUser); // Update local state
      localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Store updated user in localStorage
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (!currentUser) return <p>Loading...</p>; // Show loading state until the user is fetched

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={formData.username} // Bind value directly to formData
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email} // Bind value directly to formData
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="New Password"
          value={formData.password} // Bind value directly to formData
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
       
      </form>
    </div>
  );
}
