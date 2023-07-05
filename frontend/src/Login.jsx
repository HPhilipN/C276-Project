// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./styles/Login.css";
import Navbar from "./Navbar.jsx";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Components from "./Components";

function App() {
   const [signIn, toggle] = React.useState(true);
   const [showPassword, setShowPassword] = React.useState(false);
   const [nameValue, setNameValue] = useState("");
   const [emailValue, setEmailValue] = useState("");
   const [passwordValue, setPasswordValue] = useState("");
   let newUser;
   let signInStatus;

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

   async function signUpUser(event) {
      // event.preventDefault(); // prevent page refresh on sign-up, not needed for prod
      createUserObjectFromInputs();
      console.log(newUser); //new user details
      // "https://replicake.onrender.com/users/signup"
      // "/users/signup"
      fetch("https://replicake.onrender.com/users/signup", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newUser),
      })
         .then((response) => {
            signInStatus = response.data; //TODO: get boolean return value doesnt work
            console.log(`Returned value: ${signInStatus} from /users/signup`);
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   function createUserObjectFromInputs() {
      newUser = {
         name: nameValue,
         isChef: true,
         isModerator: false,
         email: emailValue,
         password: passwordValue,
      };
   }

   return (
      <div>
         <Navbar />
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
                  <Components.Input type="email" placeholder="Email" />
                  <div className="password-input-wrapper">
                     <Components.Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
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
                  <Components.Anchor className="forgot-password" href="#">
                     Forgot your password?
                  </Components.Anchor>
                  <Components.Button className="btn-hover">Sign In</Components.Button>
               </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
               <Components.Overlay signinIn={signIn}>
                  <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                        To keep connected with us, please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton className="btn-hover" onClick={() => toggle(true)}>
                        Sign In
                     </Components.GhostButton>
                  </Components.LeftOverlayPanel>

                  <Components.RightOverlayPanel signinIn={signIn}>
                     <Components.Title>Hello, Friend!</Components.Title>
                     <Components.Paragraph>
                        Enter your personal details and start the journey with us
                     </Components.Paragraph>
                     <Components.GhostButton className="btn-hover" onClick={() => toggle(false)}>
                        Sign Up
                     </Components.GhostButton>
                  </Components.RightOverlayPanel>
               </Components.Overlay>
            </Components.OverlayContainer>
         </Components.Container>
      </div>
   );
}

export default App;
