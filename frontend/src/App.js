import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";        
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import { useAuth } from "./AuthContext";

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ padding: 20 }}>Loading…</p>;

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={user ? <Navigate to="/user/home" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/user/home" /> : <Signup />} />

        <Route path="/user/home" element={user ? <Dashboard />  : <Navigate to="/login" />} />
        <Route path="/properties" element={user ? <Properties /> : <Navigate to="/login" />} />
        <Route path="/properties/new" element={user ? <AddProperty />: <Navigate to="/login" />} />
        <Route path="/properties/:id/edit" element={user ? <EditProperty /> : <Navigate to="/login" />} />

        <Route path="*" element={<h2 style={{ padding: 20 }}>404 Not Found</h2>} />
      </Routes>
    </>
  );
}
