import "./App.css";
import "./Login.css"
import Home from "./Home.jsx";
import Login from "./Login.jsx"
import Searchbar from "./Searchbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/search" element ={<Searchbar/>} ></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
