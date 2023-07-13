import "./styles/App.css";
import "./styles/Login.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import UserRecipes from "./UserRecipes";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProvider from "./UserContext";

function App() {
   return (
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/recipes" element={<UserRecipes />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </UserProvider>
   );
}

export default App;
