import "./styles/App.css";
import "./styles/Login.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Cookbook from "./Cookbook";
import NotFound from "./NotFound";
import Setting from "./Setting.jsx";
import Adminhome from "./Adminhome";
import AdminUserlist from "./AdminUserslist";
import AdminRecipelist from "./AdminRecipeslist";
import UserProvider from "./utils/UserContext";
import RecipeDisplay from "./RecipeDisplay";
import Recipes from "./Recipes";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
   return (
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               {/* <Route path="/dashboard" element={<Dashboard />} /> */}
               <Route path="/setting" element={<Setting />} />
               <Route path="/recipes" element={<Recipes />} />
               <Route path="/cookbook" element={<Cookbook />} />
               <Route path="/cookbook/view/:rid" element={<RecipeDisplay />} />
               <Route path="/adminhome" element={<Adminhome />} />
               <Route path="/adminusers" element={<AdminUserlist />} />
               <Route path="/adminrecipes" element={<AdminRecipelist />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </UserProvider>
   );
}

export default App;
