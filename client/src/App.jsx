import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Signup from './componets/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
