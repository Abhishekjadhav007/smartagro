// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import LandingPage from "./Components/LandingPage";

// Import your pages



export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={< LandingPage/>} />
        <Route path="/register" element={< Register/>} />
          <Route path="/login" element={< Login/>} />
            <Route path="/dashboard" element={< Dashboard/>} />
     
 
      </Routes>
    </Router>
  );
}
