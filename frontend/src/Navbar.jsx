import React, { useState } from "react";
import Logo from "./assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
   const [openMenu, setOpenMenu] = useState(false);
   const menuOptions = [
      {
         text: "Home",
         icon: <HomeIcon />,
         onClick: () => (window.location.href = "/"),
      },
      {
         text: "Search for Recipes",
         icon: <SearchIcon />,
         onClick: () => (window.location.href = "/dashboard"),
      },
      {
         text: "Sign Up/Sign In",
         icon: <LoginOutlinedIcon />,
         onClick: () => (window.location.href = "/login"),
      },
   ];

   return (
      <nav className="navbar">
         <div className="navbar-logo-container">
            <a href="/"><img src={Logo} alt="" /></a>
         </div>
         <div className="navbar-links-container">
            <a href="/">Home</a>
            <a href="/dashboard">Search for Recipes</a>
            <a href="/login" className="primary-button">
               Sign Up/Sign In
            </a>
         </div>
         <div className="navbar-menu-container">
            <HiOutlineBars3 size={42} onClick={() => setOpenMenu(true)} />
         </div>
         <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
            <Box
               sx={{ width: 250 }}
               role="presentation"
               onClick={() => setOpenMenu(false)}
               onKeyDown={() => setOpenMenu(false)}
            >
               <List>
                  {menuOptions.map((item) => (
                     <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                           <ListItemIcon>{item.icon}</ListItemIcon>
                           <ListItemText primary={item.text} />
                        </ListItemButton>
                     </ListItem>
                  ))}
               </List>
               <Divider />
            </Box>
         </Drawer>
      </nav>
   );
};

export default Navbar;
