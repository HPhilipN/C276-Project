import React, { useContext, useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Navbar from "./Navbar";
import "./styles/Setting.css";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordStrengthBar from "react-password-strength-bar";

const Setting = () => {
   const [activeTab, setActiveTab] = useState("account"); // State to track the active tab
   const [showPassword, setShowPassword] = useState({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
   }); // State to toggle password visibility

   // Accessing isChef, and isModerator from the UserContext
   const { isChef, isModerator, emailValue } = useContext(UserContext);

   const { nameValue } = useContext(UserContext);
   const { setNameValue, setEmailValue } = useContext(UserContext);
   const [passwordError, setPasswordError] = useState(""); // State to hold password error message
   const [emailError, setEmailError] = useState("");
   const [nameError, setNameError] = useState("");
   const { userId } = useContext(UserContext);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);


   // mods should not be able to access this
   const navigate = useNavigate();
   if (isModerator) {
      navigate("/adminhome");
   }

   // State to hold the user's account settings
   const [userAccount, setUserAccount] = useState({
      name: "",
      email: "",
   });

   // State to hold the password fields
   const [passwordFields, setPasswordFields] = useState({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
   });

   const [emptyFieldErrors, setEmptyFieldErrors] = useState({
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
   });

   // Effect to set the initial user account values when the component mounts
   useEffect(() => {
      if (isChef || isModerator) {
         // Populate the local state with the context values when signed in
         setUserAccount({
            name: nameValue,
            email: emailValue,
         });

         // Initialize the password fields with empty values when signed in
         setPasswordFields({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
         });
      }
   }, [isChef, isModerator, nameValue, emailValue]); // Run this effect whenever isChef, isMod, nameValue, or email changes

   // Function to handle input changes for account settings
   const handleAccountInputChange = (event) => {
      const { name, value } = event.target;
      setUserAccount((prevAccount) => ({
         ...prevAccount,
         [name]: value,
      }));
   };

   const isEmailValid = (email) => {
      // Regular expression for email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
   };

   // const handleAccountUpdate = async () => {

   async function handleAccountUpdate() {
      // Validate empty fields for account settings
      const accountEmptyFieldErrors = {};
      if (userAccount.name.trim() === "") {
         accountEmptyFieldErrors.name = "Name cannot be empty.";
      }
      if (userAccount.email.trim() === "") {
         accountEmptyFieldErrors.email = "Email cannot be empty.";
      }

      // If there are empty field errors, set the state and return
      if (Object.keys(accountEmptyFieldErrors).length > 0) {
         setEmptyFieldErrors(accountEmptyFieldErrors);
         return;
      }
      // Validate the email format
      const emailError = isEmailValid(userAccount.email) ? "" : "Invalid email address.";

      // Set the email error message immediately if the email is invalid
      if (emailError) {
         setEmailError(emailError);
         return;
      }

      // Logic to update the account settings in the backend
      // ...
      console.log(userId);
      fetch(`https://replicake.onrender.com/users/update/${userId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            name: userAccount.name,
            email: userAccount.email,
            chef: true,
            moderator: false,
         }),
      })
         .then((response) => response.json()) // parse JSON response
         .then((data) => {
            console.log(`Returned value: ${data} from /users/`);
            if (data) {
               // Update the context values with the new data
               setNameValue(userAccount.name);
               setEmailValue(userAccount.email);
               // Show the "Successfully Updated" message
               setShowSuccessMessage(true);
               // Hide the message after 5 seconds
               setTimeout(() => setShowSuccessMessage(false), 5000);

            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });

      // Clear the password fields if needed
      setPasswordFields({
         oldPassword: "",
         newPassword: "",
         confirmNewPassword: "",
      });

      // Clear name, email, password errors, and empty field errors
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setEmptyFieldErrors({});
   }
   // Function to handle the "Update" button click for password settings
   const handlePasswordUpdate = async () => {
      // Validate empty fields for password settings
      const passwordEmptyFieldErrors = {};
      if (passwordFields.oldPassword.trim() === "") {
         passwordEmptyFieldErrors.oldPassword = "Old Password cannot be empty.";
      }
      if (passwordFields.newPassword.trim() === "") {
         passwordEmptyFieldErrors.newPassword = "New Password cannot be empty.";
      }
      if (passwordFields.confirmNewPassword.trim() === "") {
         passwordEmptyFieldErrors.confirmNewPassword = "Confirm Password cannot be empty.";
      }

      // If there are empty field errors, set the state and return
      if (Object.keys(passwordEmptyFieldErrors).length > 0) {
         setEmptyFieldErrors(passwordEmptyFieldErrors);
         return;
      }

      // Validate the new passwords
      if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
         setPasswordError("New passwords do not match.");
         return;
      } else if (passwordFields.newPassword.length < 6) {
         setPasswordError("Password must be at least 6 characters long.");
         return;
      }

      // Call the backend API to verify the old password
      console.log(userId);

      fetch(`https://replicake.onrender.com/users/update/password/${userId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            oldPassword: passwordFields.oldPassword,
            newPassword: passwordFields.newPassword,
            confirmNewPassword: passwordFields.confirmNewPassword,
         }),
      })
         .then((response) => response.json()) // parse JSON response
         .then((data) => {
            console.log(`Returned value: ${data} from /users/`);
            // Show the "Successfully Updated" message
            setShowSuccessMessage(true);
            // Hide the message after 5 seconds
            setTimeout(() => setShowSuccessMessage(false), 500);
            
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });

      // Proceed with updating the password settings
      // ... Logic to update the password settings in the backend ...

      // After successful update, you may choose to clear the password fields or update the context values if needed
      setPasswordFields({
         oldPassword: "",
         newPassword: "",
         confirmNewPassword: "",
      });
      setPasswordError(""); // Clear password error message
      setEmptyFieldErrors({}); // Clear empty field errors
   };

   // Function to clear error messages when errors are fixed
   useEffect(() => {
      if (emptyFieldErrors.name && userAccount.name.trim() !== "") {
         setNameError("");
      }
      if (emptyFieldErrors.email && userAccount.email.trim() !== "") {
         setEmailError("");
      }
      if (emptyFieldErrors.oldPassword && passwordFields.oldPassword.trim() !== "") {
         setEmptyFieldErrors((prevErrors) => ({
            ...prevErrors,
            oldPassword: "",
         }));
      }
      if (emptyFieldErrors.newPassword && passwordFields.newPassword.trim() !== "") {
         setEmptyFieldErrors((prevErrors) => ({
            ...prevErrors,
            newPassword: "",
         }));
      }
      if (emptyFieldErrors.confirmNewPassword && passwordFields.confirmNewPassword.trim() !== "") {
         setEmptyFieldErrors((prevErrors) => ({
            ...prevErrors,
            confirmNewPassword: "",
         }));
      }
      if (emptyFieldErrors.name && userAccount.name.trim() !== "") {
         setEmptyFieldErrors((prevErrors) => ({
            ...prevErrors,
            name: "",
         }));
      }
      if (emptyFieldErrors.email && userAccount.email.trim() !== "") {
         setEmptyFieldErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
         }));
      }
   }, [
      emptyFieldErrors,
      userAccount.name,
      userAccount.email,
      passwordFields.oldPassword,
      passwordFields.newPassword,
      passwordFields.confirmNewPassword,
   ]);

   // Function to handle the "Cancel" button click for account settings
   const handleAccountCancel = () => {
      // Reset the local state to the initial values (from the context)
      setUserAccount({
         name: nameValue,
         email: emailValue,
      });
   };

   // Function to handle the "Cancel" button click for password settings
   const handlePasswordCancel = () => {
      // Reset the password fields to empty values
      setPasswordFields({
         oldPassword: "",
         newPassword: "",
         confirmNewPassword: "",
      });
   };

   // Function to handle tab click and update the active tab
   const handleTabClick = (tab) => {
      setActiveTab(tab);
   };

   // Function to toggle password visibility for a specific field
   const togglePasswordVisibility = (field) => {
      setShowPassword((prevState) => ({
         ...prevState,
         [field]: !prevState[field],
      }));
   };

   return (
      <section className="">
         {/* Conditionally rendering the appropriate navbar based on the user status */}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="containers">
            <div
               className="bg-white shadow rounded-lg d-block d-sm-flex"
               style={{ padding: "20px", margin: "100px", width: "800px" }}
            >
               <div className="profile-tab-nav border-right">
                  <div className="p-4 d-flex flex-column align-items-center">
                     <div className="img-circle text-center mb-3">
                        <Avatar alt="Avatar" className="shadow " />
                     </div>
                     <h4 className="text-center">{nameValue}</h4>
                  </div>
                  <div
                     className="nav flex-column nav-pills"
                     id="v-pills-tab"
                     role="tablist"
                     aria-orientation="vertical"
                  >
                     <a
                        className={`nav-link ${
                           activeTab === "account" ? "active" : ""
                        } unselectable`}
                        id="account-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="account"
                        aria-selected={activeTab === "account"}
                        onClick={() => handleTabClick("account")}
                     >
                        <i className="fa fa-home text-center mr-1"></i>
                        Account
                     </a>
                     <a
                        className={`nav-link ${
                           activeTab === "password" ? "active" : ""
                        } unselectable`}
                        id="password-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="password"
                        aria-selected={activeTab === "password"}
                        onClick={() => handleTabClick("password")}
                     >
                        <i className="fa fa-key text-center mr-1"></i>
                        Password
                     </a>
                     {/* Add more tab links for other sections */}
                  </div>
               </div>
               <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                  <div
                     className={`tab-pane fade ${activeTab === "account" ? "show active" : ""}`}
                     id="account"
                     role="tabpanel"
                     aria-labelledby="account-tab"
                  >
                     <h3 className="mb-4">Account Settings</h3>
                     <div className="row">
                        <div className="col-md-4">
                           <div className="form-group">
                              <label>Name</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 name="name"
                                 value={userAccount.name}
                                 onChange={handleAccountInputChange}
                              />
                           </div>
                        </div>
                        <div className="col-md-4">
                           <div className="form-group">
                              <label>Email</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 name="email"
                                 value={userAccount.email}
                                 onChange={handleAccountInputChange}
                              />
                           </div>
                        </div>
                        {/* More form groups for other fields */}
                     </div>
                     <div>
                        <button className="btn btn-primary" onClick={handleAccountUpdate}>
                           Update
                        </button>
                        <button className="btn btn-light" onClick={handleAccountCancel}>
                           Cancel
                        </button>
                     </div>
                     {Object.values(emptyFieldErrors).map((error, index) => (
                        <div key={index} className="text-danger mt-2">
                           {error}
                        </div>
                     ))}
                     {emailError && <div className="text-danger mt-2">{emailError}</div>}
                     {nameError && <div className="text-danger mt-2">{nameError}</div>}
                     {showSuccessMessage && (
                        <div className="alert alert-success mt-2">Successfully Updated!</div>
                     )}
                  </div>
                  <div
                     className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`}
                     id="password"
                     role="tabpanel"
                     aria-labelledby="password-tab"
                  >
                     <h3 className="mb-4">Password Settings</h3>
                     <div className="row">
                        <div className="col-md-8">
                           <div className="form-group">
                              <label>Old Password</label>
                              <div className="password-input-container">
                                 <input
                                    type={showPassword.oldPassword ? "text" : "password"}
                                    className="form-control"
                                    value={passwordFields.oldPassword}
                                    onChange={(e) =>
                                       setPasswordFields({
                                          ...passwordFields,
                                          oldPassword: e.target.value,
                                       })
                                    }
                                 />
                                 <IconButton
                                    onClick={() => togglePasswordVisibility("oldPassword")}
                                 >
                                    {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-8">
                           <div className="form-group">
                              <label>New Password</label>
                              <div className="password-input-container">
                                 <input
                                    type={showPassword.newPassword ? "text" : "password"}
                                    className="form-control"
                                    value={passwordFields.newPassword}
                                    onChange={(e) =>
                                       setPasswordFields({
                                          ...passwordFields,
                                          newPassword: e.target.value,
                                       })
                                    }
                                 />
                                 <IconButton
                                    onClick={() => togglePasswordVisibility("newPassword")}
                                 >
                                    {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </div>
                              {/* Password strength bar */}
                              <PasswordStrengthBar
                                 className="pw-strengths"
                                 password={passwordFields.newPassword}
                                 minLength={6}
                                 onChangeScore={(score) => console.log(score)}
                                 scoreWords={["weak", "weak", "fair", "good", "strong"]}
                              />
                           </div>
                        </div>
                        <div className="col-md-9">
                           <div className="form-group">
                              <label>Confirm Password</label>
                              <div className="password-input-container">
                                 <input
                                    type={showPassword.confirmNewPassword ? "text" : "password"}
                                    className="form-control"
                                    value={passwordFields.confirmNewPassword}
                                    onChange={(e) =>
                                       setPasswordFields({
                                          ...passwordFields,
                                          confirmNewPassword: e.target.value,
                                       })
                                    }
                                 />
                                 <IconButton
                                    onClick={() => togglePasswordVisibility("confirmNewPassword")}
                                 >
                                    {showPassword.confirmNewPassword ? (
                                       <VisibilityOff />
                                    ) : (
                                       <Visibility />
                                    )}
                                 </IconButton>
                              </div>
                              {/* Password strength bar */}
                              <PasswordStrengthBar
                                 className="pw-strengths"
                                 password={passwordFields.confirmNewPassword}
                                 minLength={6}
                                 onChangeScore={(score) => console.log(score)}
                                 scoreWords={["weak", "weak", "fair", "good", "strong"]}
                              />
                           </div>
                        </div>
                        {/* More form groups for other fields */}
                     </div>
                     <div>
                        <button className="btn btn-primary" onClick={handlePasswordUpdate}>
                           Update
                        </button>
                        <button className="btn btn-light" onClick={handlePasswordCancel}>
                           Cancel
                        </button>
                     </div>
                     {/* Password settings form */}
                     {Object.values(emptyFieldErrors).map((error, index) => (
                        <div key={index} className="text-danger mt-2">
                           {error}
                        </div>
                     ))}
                     {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                     {showSuccessMessage && (
                        <div className="alert alert-success mt-2">Successfully Updated!</div>
                     )}
                  </div>
                  {/* Add more tab panes for other sections */}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Setting;
