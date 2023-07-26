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
import RecipeProvider from "./utils/RecipeContext";
import RecipeDisplay from "./RecipeDisplay";
import Recipes from "./Recipes";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
   return (
      <div className="App">
         <UserProvider>
            <RecipeProvider>
               <Router>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/login" element={<Login />} />
                     {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                     <Route path="/settings" element={<Setting />} />
                     <Route path="/recipes" element={<Recipes />} />
                     <Route path="/cookbook" element={<Cookbook />} />
                     <Route path="/cookbook/view/:rid" element={<RecipeDisplay />} />
                     <Route path="/admin/home" element={<Adminhome />} />
                     <Route path="/admin/users" element={<AdminUserlist />} />
                     <Route path="/admin/recipes" element={<AdminRecipelist />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </Router>
            </RecipeProvider>
         </UserProvider>
      </div>
   );
}

export default App;
