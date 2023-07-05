import "./styles/Login.css";
import Navbar from "./Navbar.jsx";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Components from "./Components";
import { UserContext } from "./UserContext";

function Login() {
   const [signIn, toggleSignInUp] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [emailValue, setEmailValue] = useState("");
   const [passwordValue, setPasswordValue] = useState("");
   // states from UserContext.jsx
   const {
      signInStatus,
      setSignInStatus,
      isChef,
      setIsChef,
      isModerator,
      setIsModerator,
      nameValue,
      setNameValue,
   } = useContext(UserContext);

   let newUser;

   const handleNameChange = (event) => {
      setNameValue(event.target.value);
   };
   const handleEmailChange = (event) => {
      setEmailValue(event.target.value);
   };
   const handlePasswordChange = (event) => {
      setPasswordValue(event.target.value);
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   // user sign up
   async function signUpUser(event) {
      // event.preventDefault(); // prevent page refresh on sign-up
      createUserObjectFromInputs();
      if (newUser.password.length >= 6) {
         console.log(newUser); //new user details to send to endpoint
         // "https://replicake.onrender.com/users/signup"
         // "/users/signup"
         fetch("https://replicake.onrender.com/users/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
         })
            .then((response) => response.json()) // parse JSON response
            .then((data) => {
               console.log(`Returned value: ${data} from /users/signup`);
            })
            .catch((error) => {
               console.log("===== ERROR =====");
               console.log(error);
            });
      }
   }

   // user login
   async function loginUser(event) {
      event.preventDefault(); // prevent page refresh on login
      setNameValue(""); // reset name value
      createUserObjectFromInputs();
      console.log(newUser); // user details to send to endpoint
      // "https://replicake.onrender.com/users/login"
      // "/users/login"
      fetch("https://replicake.onrender.com/users/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newUser),
      })
         .then((response) => response.json()) // parse JSON response
         .then((data) => {
            if (data) {
               setSignInStatus(true);
               setIsChef(data.chef);
               setIsModerator(data.moderator);
               setNameValue(data.name);
            } else {
               setSignInStatus(false);
               setIsChef(false);
               setIsModerator(false);
            }
            console.log(data);
         })
         .catch((error) => {
            setSignInStatus(false);
            setIsChef(false);
            setIsModerator(false);
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   // signup/login helper functions
   function createUserObjectFromInputs() {
      newUser = {
         name: nameValue,
         email: emailValue,
         password: passwordValue,
         moderator: false,
         chef: true,
      };
   }

   // login persistance, keep user logged in through refreshes
   function logoutUser() {
      // Clear the user's sign-in status and details from localStorage
      localStorage.removeItem("signInStatus");
      localStorage.removeItem("isChef");
      localStorage.removeItem("isModerator");
      localStorage.removeItem("name");

      // Reset the component's state
      setSignInStatus(false);
      setIsChef(false);
      setIsModerator(false);
      setNameValue("");
   }

   const loginModal = (
      <Components.Container>
         <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
               <Components.Title>Create Account</Components.Title>
               <Components.Input type="text" placeholder="Name" onChange={handleNameChange} />
               <Components.Input type="email" placeholder="Email" onChange={handleEmailChange} />
               <div className="password-input-wrapper">
                  <Components.Input
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     onChange={handlePasswordChange}
                  />
                  <button
                     type="button"
                     className="password-toggle-button"
                     onClick={togglePasswordVisibility}
                  >
                     {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                     ) : (
                        <FontAwesomeIcon icon={faEye} />
                     )}
                  </button>
               </div>
               <Components.Button className="sign-up-button btn-hover" onClick={signUpUser}>
                  Sign Up
               </Components.Button>
            </Components.Form>
         </Components.SignUpContainer>

         <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
               <Components.Title>Sign in</Components.Title>
               <Components.Input type="email" placeholder="Email" onChange={handleEmailChange} />
               <div className="password-input-wrapper">
                  <Components.Input
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     onChange={handlePasswordChange}
                  />
                  <button
                     type="button"
                     className="password-toggle-button"
                     onClick={togglePasswordVisibility}
                  >
                     {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                     ) : (
                        <FontAwesomeIcon icon={faEye} />
                     )}
                  </button>
               </div>
               <p className={signInStatus ? "invisible" : "invalid-login"}>
                  Incorrect email or password
               </p>
               <Components.Anchor className="forgot-password" href="#">
                  Forgot your password?
               </Components.Anchor>
               <Components.Button className="btn-hover" onClick={loginUser}>
                  Sign In
               </Components.Button>
            </Components.Form>
         </Components.SignInContainer>

         <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
               <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                     To keep connected with us, please login with your personal info
                  </Components.Paragraph>
                  <Components.GhostButton
                     className="btn-hover"
                     onClick={() => toggleSignInUp(true)}
                  >
                     Sign In
                  </Components.GhostButton>
               </Components.LeftOverlayPanel>

               <Components.RightOverlayPanel signinIn={signIn}>
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.Paragraph>
                     Enter your personal details and start the journey with us
                  </Components.Paragraph>
                  <Components.GhostButton
                     className="btn-hover"
                     onClick={() => toggleSignInUp(false)}
                  >
                     Sign Up
                  </Components.GhostButton>
               </Components.RightOverlayPanel>
            </Components.Overlay>
         </Components.OverlayContainer>
      </Components.Container>
   );

   const logoutModal = (
      <Components.Container>
         <Components.Form>
            <Components.Title>Logged in as {nameValue}</Components.Title>
            <Components.Button className="logout-btn btn-hover" onClick={logoutUser}>
               Logout
            </Components.Button>
         </Components.Form>
      </Components.Container>
   );

   return (
      <>
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {signInStatus && logoutModal}

         {!signInStatus && <Navbar />}
         {!signInStatus && loginModal}
      </>
   );
}

export default Login;
