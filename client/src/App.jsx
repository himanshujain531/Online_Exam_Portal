import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Question from "./pages/Admin/Question";
import QuestionList from "./pages/Admin/QuestionList";
import StudentLogin from "./pages/StudentLogin";
import Register from "./pages/Register";
import StudentDashboard from "./pages/Student/StudentDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-sign-in" element={<SignIn />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/register" element={<Register />} />


          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="StudentDashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
                  <Route path="/questions/:examName" element={<Question />} />
                 <Route path="/question-list" element={<QuestionList />} /> 


          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
