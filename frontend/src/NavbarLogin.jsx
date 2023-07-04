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
import SettingsIcon from "@mui/icons-material/Settings";
import BookIcon from "@mui/icons-material/Book";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles/NavbarLogin.css";

const Navbar = () => {
   const [openMenu, setOpenMenu] = useState(false);
   const menuOptions = [
      {
         text: "Home",
         icon: <HomeIcon />,
      },
      {
         text: "Recipes",
         icon: <SearchIcon />,
      },
      {
         text: "Cookbook",
         icon: <BookIcon />,
      },
      {
         text: "Settings",
         icon: <SettingsIcon />,
         profile: true,
      },
      {
         text: "Logout",
         icon: <LogoutIcon />,
      },
   ];

   return (
      <nav className="navbar">
         <div className="navbar-logo-container">
            <img src={Logo} alt="" />
         </div>
         <div className="navbar-links-container">
            <a href="/">Home</a>
            <a>Recipes</a>
            <a>Cookbook</a>
            <a>Settings</a>
            <div className="navbar-profile">
               <Avatar className="navbar-profile-picture" alt="Profile Picture" />
            </div>
         </div>
         <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
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
                        <ListItemButton>
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
