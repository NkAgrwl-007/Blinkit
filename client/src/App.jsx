import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Signup from './componets/Signup';
import Home from "./componets/Home";
import Admin from './componets/Admin';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
