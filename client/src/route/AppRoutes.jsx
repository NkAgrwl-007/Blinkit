import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../componets/Home";
import Admin from "../componets/Admin";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
