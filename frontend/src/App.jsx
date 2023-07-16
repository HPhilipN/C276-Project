import "./styles/App.css";
import "./styles/Login.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import Setting from "./Setting.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProvider from "./UserContext";

function App() {
   return (
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/setting" element={<Setting />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </UserProvider>
   );
}

export default App;
