import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfile({ currentUser }) {
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '', // Adding password to the state
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info('Updating profile...', { autoClose: 3000 });
      const res = await fetch(`/api/admin/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(`Update failed: ${data.message}`, { autoClose: 5000 });
        return;
      }

      toast.success('Profile updated successfully!', { autoClose: 5000 });
    } catch (error) {
      toast.error(`Error: ${error.message}`, { autoClose: 5000 });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={formData.username}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              id="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password (Leave blank to keep unchanged)
            </label>
            <input
              type="password"
              value={formData.password}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              id="password"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
