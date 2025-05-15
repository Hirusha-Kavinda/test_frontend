import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserManage from "./pages/UserManage";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import Admin from "./pages/admin";
import User from "./pages/user";
import Manager from "./pages/manager";

import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user-manage" element={<UserManage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin/></ProtectedRoute>} />
        <Route path="/manager" element={<ProtectedRoute allowedRoles={["manager"]}><Manager/></ProtectedRoute>} />
        <Route path="/user" element={<User/>} />
        
      
      </Routes>
    </Router>
  );
}

export default App;
