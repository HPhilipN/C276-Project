import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Logo from "./assets/logo-625px.png";
import "./styles/NotFound.css";

export default function NotFound() {
   return (
      <div className="container">
         <div className="grid">
            <h1>The page you're looking for does not exist</h1>
            <div>
               <p>Here are some helpful links:</p>
               <Link to="/">Home</Link>
               <Link to="/login">Login</Link>
               <Link to="/dashboard">Dashboard</Link>
            </div>
         </div>
      </div>
   );
}
