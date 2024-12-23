import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateProfile from "./pages/Admin/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Subject from "./pages/Admin/Subject";

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
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
