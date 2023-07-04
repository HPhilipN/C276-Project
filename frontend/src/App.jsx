import "./styles/App.css";
import "./styles/Login.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
   return (
      <div>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
