import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import Signup from "./componets/Signup";
import Home from "./componets/Home";
import Admin from "./componets/Admin";
import AddProduct from "./componets/AddProduct";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
