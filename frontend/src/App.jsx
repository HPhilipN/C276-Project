import "./App.css";
import "./Login.css"
import Home from "./Home.jsx";
import Login from "./Login.jsx"
import Dashboard from "./dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
