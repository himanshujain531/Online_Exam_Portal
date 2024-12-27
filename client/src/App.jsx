import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Question from "./pages/Admin/Question";
import QuestionList from "./pages/Admin/QuestionList";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-sign-in" element={<SignIn />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
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
