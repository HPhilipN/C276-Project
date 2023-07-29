import React, { useState, useContext } from "react";
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
import { logoutUser } from "./Login";
import { UserContext } from "./utils/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/NavbarLogin.css";
import "./styles/Navbar.css";
//check Navbar.jsxfor comments on code
const NavbarLogin = () => {
   const { setIsChef, setIsModerator, setNameValue, setUserId, setEmailValue } =
      useContext(UserContext);
   const navigate = useNavigate();
   const [openMenu, setOpenMenu] = useState(false);
   const { nameValue } = useContext(UserContext);
   const firstLetter = nameValue.charAt(0).toUpperCase();

   const menuOptions = [
      {
         text: "Home",
         icon: <HomeIcon />,
         onClick: () => <Link className="button" to="/"></Link>,
      },
      {
         text: "Recipes",
         icon: <SearchIcon />,
         onClick: () => <Link className="button" to="/recipes"></Link>,
      },
      {
         text: "Cookbook",
         icon: <BookIcon />,
         onClick: () => <Link className="button" to="/cookbook"></Link>,
      },
      {
         text: "Settings",
         icon: <SettingsIcon />,
         profile: true,
         onClick: () => <Link className="button" to="/settings"></Link>,
      },
      {
         text: "Logout",
         icon: <LogoutIcon />,
         onClick: logoutUserHelper,
      },
   ];

   function logoutUserHelper() {
      logoutUser(setIsChef, setIsModerator, setNameValue, setUserId, setEmailValue);
      navigate("/");
   }

   return (
      <nav className="navbar">
         <div className="navbar-logo-container">
            <a href="/">
               <img src={Logo} alt="" />
            </a>
         </div>
         <div className="navbar-links-container">
            <Link className="nav-buttons" to="/">
               Home
            </Link>
            <Link className="nav-buttons" to="/recipes">
               Recipes
            </Link>
            <Link className="nav-buttons" to="/cookbook">
               Cookbook
            </Link>
            <Link className="nav-buttons" to="/settings">
               Settings
            </Link>
            <Link className="nav-buttons" to="/" onClick={logoutUserHelper}>
               Log Out
            </Link>
            <Link className="navbar-profile" to="/settings" style={{ marginRight: 5 }}>
               <Avatar className="navbar-profile-picture" alt="Profile Picture">
                  {firstLetter}
               </Avatar>
            </Link>
         </div>
         <div className="navbar-menu-container">
            <div className="navbar-logo-containers">
               <img size={100} src={Logo} alt="" />
            </div>
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

export default NavbarLogin;
