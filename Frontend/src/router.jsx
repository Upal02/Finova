import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import User from "./pages/User";
import Analyst from "./pages/analyst";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <>
       
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/user" element={<User />} />
          <Route path="/analyst" element={<Analyst />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="*" element={<LoginPage />} />
        </Routes>

        
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;