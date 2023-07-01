import "./App.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
