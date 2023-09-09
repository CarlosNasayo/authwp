import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { AuthProvider } from "./context/authcontext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/home";
import Protectedroute from "./components/Protectedroute";
import Phone from "./components/phone";
function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route exact path="/" element={
          <Protectedroute>
             <Home />
          </Protectedroute>
       
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone" element={<Phone />} />
      </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
