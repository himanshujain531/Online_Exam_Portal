import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Question = ({ onBack }) => {
  const [formData, setFormData] = useState({
    examName: "",
    questionText: "",
    options: { a: "", b: "", c: "", d: "" },
    correctAnswer: "",
    marks: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["a", "b", "c", "d"].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        options: { ...prevFormData.options, [name]: value },
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { examName, questionText, correctAnswer, marks } = formData;
    if (!examName.trim() || !questionText.trim() || !correctAnswer || !marks) {
      toast.warn("All fields are required.");
      return;
    }
    try {
      const response = await axios.post("/api/admin/add/question", formData);
      toast.success(response.data.message);
      setFormData({
        examName: "",
        questionText: "",
        options: { a: "", b: "", c: "", d: "" },
        correctAnswer: "",
        marks: 0,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add question!");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Question</h1>
      <div>
        <label className="block font-medium mb-2">Exam Name</label>
        <input
          type="text"
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          placeholder="Enter exam name"
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Question Text</label>
        <input
          type="text"
          name="questionText"
          value={formData.questionText}
          onChange={handleChange}
          placeholder="Enter question text"
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      {["a", "b", "c", "d"].map((opt) => (
        <div key={opt}>
          <label className="block font-medium mb-2">Option {opt.toUpperCase()}</label>
          <input
            type="text"
            name={opt}
            value={formData.options[opt]}
            onChange={handleChange}
            placeholder={`Enter Option ${opt.toUpperCase()}`}
            className="w-full border rounded p-2 mb-4"
          />
        </div>
      ))}
      <div>
        <label className="block font-medium mb-2">Correct Answer (a, b, c, d)</label>
        <input
          type="text"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          placeholder="Enter correct answer"
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Marks</label>
        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          placeholder="Enter marks"
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div className="flex justify-between">
       
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Question
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Question;
