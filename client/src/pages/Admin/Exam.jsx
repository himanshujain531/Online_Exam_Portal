import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: "Easy",
    totalQuestions: 0,
    totalMarks: 0,
    passMarks: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null); // New state for selected exam details
  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("/api/admin/all/exam");
      setExams(response.data.exam);
    } catch (error) {
      toast.error("Failed to fetch exams!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/exam/${id}`);
      toast.success("Exam deleted successfully!");
      fetchExams();
    } catch (error) {
      toast.error("Failed to delete exam!");
    }
  };

  const handleAddExam = async () => {
    if (!formData.name.trim()) {
      toast.warn("Exam name is required.");
      return;
    }
    try {
      await axios.post("/api/admin/add/exam", formData);
      toast.success("Exam added successfully!");
      fetchExams();
      setFormData({
        name: "",
        description: "",
        level: "Easy",
        totalQuestions: 0,
        totalMarks: 0,
        passMarks: 0,
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add exam!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailsClick = (exam) => {
    setSelectedExam(exam); // Set the selected exam details
  };

  const closeDetails = () => {
    setSelectedExam(null); // Close the details view
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Exam List</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mb-4 text-sm lg:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Exam Name</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-left">Creation Date & Time</th>
              <th className="border border-gray-300 p-2 text-left">Level</th>
              <th className="border border-gray-300 p-2 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No exams available.
                </td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{exam.name}</td>
                  <td className="border border-gray-300 p-2">{exam.description}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(exam.creationDate).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{exam.level}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleDetailsClick(exam)}
                        className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => navigate(`/question-list?examName=${exam.name}`)}
                       className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition">
                        View Questions
                      </button>
                      <button 
                      onClick={() => navigate(`/admin-dashboard?section=question&examName=${exam.name}`)}
                      className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600 transition">
                        Add Questions
                      </button>
                      <button
                        onClick={() => handleDelete(exam._id)}
                        className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
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
          {showAddForm ? "Close" : "Add Exam"}
        </button>
      </div>

      {showAddForm && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Add New Exam</h2>
          <label className="block mb-2 font-medium text-gray-700">Exam Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Exam Name"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 font-medium text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full mb-4"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label className="block mb-2 font-medium text-gray-700">Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={formData.totalQuestions}
            onChange={handleChange}
            placeholder="Enter Total Questions"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 font-medium text-gray-700">Total Marks</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            placeholder="Enter Total Marks"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 font-medium text-gray-700">Pass Marks</label>
          <input
            type="number"
            name="passMarks"
            value={formData.passMarks}
            onChange={handleChange}
            placeholder="Enter Pass Marks"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              onClick={handleAddExam}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
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

      {selectedExam && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Exam Details</h2>
          <p><strong>Exam Name:</strong> {selectedExam.name}</p>
          <p><strong>Description:</strong> {selectedExam.description}</p>
          <p><strong>Creation Date & Time:</strong> {new Date(selectedExam.creationDate).toLocaleString()}</p>
          <p><strong>Level:</strong> {selectedExam.level}</p>
          <p><strong>Total Questions:</strong> {selectedExam.totalQuestions}</p>
          <p><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
          <p><strong>Pass Marks:</strong> {selectedExam.passMarks}</p>
          <div className="text-center mt-4">
            <button
              onClick={closeDetails}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Exam;
