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
   // State for controlling the menu open/close state
   const [openMenu, setOpenMenu] = useState(false);
   // Array of menu options
   const menuOptions = [
      {
         text: "Home",
         icon: <HomeIcon />,
         onClick: () => <Link className="button" to="/"></Link>, // Action to perform when "Home" is clicked
      },
      {
         text: "Search for Recipes",
         icon: <SearchIcon />,
         onClick: () => <Link className="button" to="/recipes"></Link>,
      },
      {
         text: "Sign Up/Sign In",
         icon: <LoginOutlinedIcon />,
         onClick: () => <Link className="button" to="/ogin"></Link>,
      },
   ];

   return (
      <nav className="navbar">
         <div className="navbar-logo-container">
            <a href="/">
               <img src={Logo} alt="" />
            </a>
         </div>
         <div className="navbar-links-container">
            {/* Links to different pages */}
            <Link className="nav-buttons" to="/">
               Home
            </Link>
            <Link className="nav-buttons" to="/recipes">
               Search for Recipes
            </Link>
            <Link className="signin-btn" to="/login">
               Sign Up/Sign In
            </Link>
         </div>
         <div className="navbar-menu-container">
            <div className="navbar-logo-containers">
                  <img size={100} src={Logo} alt="" />
            </div>
            <HiOutlineBars3 size={42} onClick={() => setOpenMenu(true)} />
         </div>
         {/* Drawer component for the menu */}
         <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
            <Box
               sx={{ width: 250 }}
               role="presentation"
               onClick={() => setOpenMenu(false)}
               onKeyDown={() => setOpenMenu(false)}
            >
               <List>
                  {/* Mapping over menuOptions array and rendering the menu items */}
                  {menuOptions.map((item) => (
                     <ListItem key={item.text} disablePadding className="nav-buttons">
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
