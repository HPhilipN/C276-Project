import "./styles/Login.css";
import Navbar from "./Navbar.jsx";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Components from "./utils/Components";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn";

// login persistance, keep user logged in through refreshes
export function logoutUser(setIsChef, setIsModerator, setNameValue, setUserId, setEmailValue) {
   // Clear the user's sign-in status and details from localStorage
   localStorage.removeItem("isChef");
   localStorage.removeItem("isModerator");
   localStorage.removeItem("name");
   localStorage.removeItem("userId");

   // Reset the component's state
   setIsChef(false);
   setIsModerator(false);
   setNameValue("");
   setUserId(-1);
   setEmailValue("");
}

function Login() {
   const [isSignInUpCard, toggleSignInUp] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [passwordValue, setPasswordValue] = useState("");
   const [signInError, setSignInError] = useState(false);
   // states from UserContext.jsx
   const {
      isChef,
      setIsChef,
      isModerator,
      setIsModerator,
      nameValue,
      setNameValue,
      userId,
      setUserId,
      emailValue,
      setEmailValue,
   } = useContext(UserContext);

   const navigate = useNavigate();
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
         //  console.log(newUser); //new user details to send to endpoint
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
      //   console.log(newUser); // user details to send to endpoint
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
               setIsChef(data.chef);
               setIsModerator(data.moderator);
               setNameValue(data.name);
               setUserId(data.uid);
               setEmailValue(data.email);
               setSignInError(false);
               // redirect to home page
               navigate("/");
            } else {
               setIsChef(false);
               setIsModerator(false);
               setUserId(-1);
               setSignInError(true);
            }
            // console.log(data);
         })
         .catch((error) => {
            setIsChef(false);
            setIsModerator(false);
            setSignInError(true);
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   function logoutUserHelper() {
      logoutUser(setIsChef, setIsModerator, setNameValue, setEmailValue);
      navigate("/");
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

   const loginModal = (
      <Components.Container>
         {/* Sign-up section */}
         <Components.SignUpContainer signinIn={isSignInUpCard}>
            <Components.Form>
               <Components.Title>Create Account</Components.Title>
               {/* Input fields for name, email, and password */}
               <Components.Input type="text" placeholder="Name" onChange={handleNameChange} />
               <Components.Input type="email" placeholder="Email" onChange={handleEmailChange} />
               <div className="password-input-wrapper">
                  <Components.Input
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     onChange={handlePasswordChange}
                  />
                  {/* Button to toggle password visibility */}
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
               <PasswordStrengthBar
                  className="pw-strength"
                  password={passwordValue}
                  minLength={6}
                  onChangeScore={(score) => console.log(score)}
                  scoreWords={["weak", "weak", "fair", "good", "strong"]}
               />
               {/* Sign-up button */}
               <Components.Button className="sign-up-button btn-hover" onClick={signUpUser}>
                  Sign Up
               </Components.Button>
            </Components.Form>
         </Components.SignUpContainer>
         {/* Sign-in section */}
         <Components.SignInContainer signinIn={isSignInUpCard}>
            <Components.Form>
               <Components.Title>Sign in</Components.Title>
               {/* Input fields for email and password */}
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
                     {/* Button to toggle password visibility */}
                     {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                     ) : (
                        <FontAwesomeIcon icon={faEye} />
                     )}
                  </button>
               </div>
               {/* Error message for incorrect login */}
               <p className={signInError ? "invalid-login" : "invisible"}>
                  Incorrect email or password
               </p>
               {/* Anchor for forgot password, basically like the "a" tag */}
               <Components.Anchor className="forgot-password" href="#">
                  Forgot your password?
               </Components.Anchor>
               {/* Sign-in button */}
               <Components.Button className="btn-hover" onClick={loginUser}>
                  Log In
               </Components.Button>
            </Components.Form>
         </Components.SignInContainer>
         {/* Overlay container */}
         <Components.OverlayContainer signinIn={isSignInUpCard}>
            <Components.Overlay signinIn={isSignInUpCard}>
               {/* Left overlay panel */}
               <Components.LeftOverlayPanel signinIn={isSignInUpCard}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                     To keep connected with us, please login with your personal info
                  </Components.Paragraph>
                  {/* Ghost button to toggle sign-in/sign-up */}
                  <Components.GhostButton
                     className="btn-hover"
                     onClick={() => toggleSignInUp(true)}
                  >
                     Log In
                  </Components.GhostButton>
               </Components.LeftOverlayPanel>
               {/* Right overlay panel */}
               <Components.RightOverlayPanel signinIn={isSignInUpCard}>
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.Paragraph>
                     Enter your personal details and start the journey with us
                  </Components.Paragraph>
                  {/* Ghost button to toggle sign-in/sign-up */}
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
            {/* logout page when once you sign in */}
            <Components.Title>Logged in as {nameValue}</Components.Title>
            <Components.Button className="logout-btn btn-hover" onClick={logoutUserHelper}>
               Logout
            </Components.Button>
         </Components.Form>
      </Components.Container>
   );

   return (
      <>
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && logoutModal}

         {!isChef && !isModerator && <Navbar />}
         {!isChef && !isModerator && loginModal}
      </>
   );
}

export default Login;
