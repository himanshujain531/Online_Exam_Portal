import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editModeId, setEditModeId] = useState(null); // ID of the question being edited
  const [editFormData, setEditFormData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const examName = queryParams.get("examName");

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`/api/admin/view/question/${examName}`);
      setQuestions(response.data.questions);
      toast.success("Questions retrieved successfully!");
    } catch (error) {
      toast.error("Failed to fetch questions!");
    }
  };

  useEffect(() => {
    if (examName) {
      fetchQuestions();
    }
  }, [examName]);

  const handleEdit = (question) => {
    setEditFormData(question);
    setEditModeId(question._id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (["a", "b", "c", "d"].includes(name)) {
      setEditFormData((prevData) => ({
        ...prevData,
        options: { ...prevData.options, [name]: value },
      }));
    } else {
      setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `/api/admin/editquestion/${editFormData._id}`,
        editFormData
      );
      toast.success(response.data.message);
      setEditModeId(null);
      fetchQuestions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update question!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/question/${id}`);
      toast.success("Question deleted successfully!");
      fetchQuestions();
    } catch (error) {
     // toast.error("Failed to delete question!");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Questions for {examName}</h1>
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Question Name</th>
              <th className="border border-gray-300 px-4 py-2">Option A</th>
              <th className="border border-gray-300 px-4 py-2">Option B</th>
              <th className="border border-gray-300 px-4 py-2">Option C</th>
              <th className="border border-gray-300 px-4 py-2">Option D</th>
              <th className="border border-gray-300 px-4 py-2">Correct Answer</th>
              <th className="border border-gray-300 px-4 py-2">Marks</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No questions available.
                </td>
              </tr>
            ) : (
              questions.map((question) => (
                <React.Fragment key={question._id}>
                  <tr className="hover:bg-gray-50 transition duration-300">
                    <td className="border border-gray-300 px-4 py-2">
                      {question.questionText}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.options.a}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.options.b}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.options.c}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.options.d}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.correctAnswer}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.marks}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(question)}
                          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(question._id)}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editModeId === question._id && (
                    <tr>
                      <td colSpan="8" className="p-4">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                          <h2 className="text-xl font-bold mb-4">Edit Question</h2>
                          <div>
                            <label className="block mb-2 font-medium">
                              Question Text
                            </label>
                            <input
                              type="text"
                              name="questionText"
                              value={editFormData.questionText}
                              onChange={handleEditChange}
                              className="w-full border rounded p-2 mb-4"
                            />
                          </div>
                          {["a", "b", "c", "d"].map((opt) => (
                            <div key={opt}>
                              <label className="block mb-2 font-medium">
                                Option {opt.toUpperCase()}
                              </label>
                              <input
                                type="text"
                                name={opt}
                                value={editFormData.options[opt]}
                                onChange={handleEditChange}
                                className="w-full border rounded p-2 mb-4"
                              />
                            </div>
                          ))}
                          <div>
                            <label className="block mb-2 font-medium">
                              Correct Answer
                            </label>
                            <input
                              type="text"
                              name="correctAnswer"
                              value={editFormData.correctAnswer}
                              onChange={handleEditChange}
                              className="w-full border rounded p-2 mb-4"
                            />
                          </div>
                          <div>
                            <label className="block mb-2 font-medium">Marks</label>
                            <input
                              type="number"
                              name="marks"
                              value={editFormData.marks}
                              onChange={handleEditChange}
                              className="w-full border rounded p-2 mb-4"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditModeId(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleEditSubmit}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionList;
