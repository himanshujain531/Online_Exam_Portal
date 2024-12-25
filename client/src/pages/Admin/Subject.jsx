import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);  // Initialize as an empty array
  const [newSubject, setNewSubject] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
      fetchSubjects();
    }, []);
  
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/admin/all/subject");
        setSubjects(response.data.subject);
      } catch (error) {
        toast.error("Failed to fetch subject!");
      }
    };
  // Add a new subject
  const addSubject = async () => {
    if (!newSubject.trim()) {
      toast.warn('Subject name is required.');
      return;
    }
    try {
      const response = await axios.post('/api/admin/add/subject', { name: newSubject });
      setSubjects([...subjects, response.data.subject]);
      setNewSubject('');
      setShowAddForm(false);
      toast.success('Subject added successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add subject.');
    }
  };

  // Delete a subject
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`/api/admin/subject/${id}`);
      setSubjects(subjects.filter((subject) => subject._id !== id));
      toast.success('Subject deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete subject. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Subject List</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mb-4 text-sm lg:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Subject Name</th>
              <th className="border border-gray-300 p-2 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center p-4">No subjects available.</td>
              </tr>
            ) : (
              subjects.map((subject) => (
                <tr key={subject._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{subject.name}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => deleteSubject(subject._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all mb-4"
        >
          {showAddForm ? 'Close' : 'Add Subject'}
        </button>
      </div>

      {showAddForm && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Add New Subject</h2>
          <label className="block mb-2 font-medium text-gray-700">Subject Name</label>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter Subject name"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={addSubject}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all mr-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
