import Header from "./components/Header";
import ToDoCard from "./components/ToDoCard";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <div className="app">
        <Header authorize={isAuthenticated} />

        <h2 className="heading-title">
          Organize your tasks, track deadlines, and stay productive.
        </h2>

        <Routes>

          {/* Home Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? <ToDoCard /> : <Navigate to="/login" />
            }
          />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
