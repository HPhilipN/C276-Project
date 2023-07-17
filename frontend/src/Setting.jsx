import React, { useContext, useState, useEffect } from 'react';
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Navbar from "./Navbar";
import "./styles/Setting.css";
import { UserContext } from "./utils/UserContext";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account"); // State to track the active tab
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
  }); // State to toggle password visibility

  // Accessing signInStatus, isChef, and isModerator from the UserContext
  const { signInStatus, isChef, isModerator, emailValue } = useContext(UserContext);

  const { nameValue } = useContext(UserContext);
  
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

  // Effect to set the initial user account values when the component mounts
  useEffect(() => {
    if (signInStatus) {
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
  }, [signInStatus, nameValue, emailValue]); // Run this effect whenever signInStatus, nameValue, or email changes

  // Function to handle input changes for account settings
  const handleAccountInputChange = (event) => {
    const { name, value } = event.target;
    setUserAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  // Function to handle the "Update" button click for account settings
  const handleAccountUpdate = () => {
    // Logic to update the account settings in the backend
    // ...
    // After successful update, you may choose to update the context values if needed
    setNameValue(userAccount.name);
    setEmail(userAccount.email);
  };
  
  // Function to handle the "Update" button click for password settings
  const handlePasswordUpdate = () => {
    // Logic to update the password settings in the backend
    // ...
    // After successful update, you may choose to clear the password fields or update the context values if needed
    setPasswordFields({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

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
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <section className="">
      {/* Conditionally rendering the appropriate navbar based on the user status */}
      {signInStatus && isChef && <NavbarLogin />}
      {signInStatus && isModerator && <NavbarAdmin />}
      {!signInStatus && <Navbar />}
      <div className="containers" >
        <div className="bg-white shadow rounded-lg d-block d-sm-flex" style={{ padding: "20px", margin: "100px", width: "800px"  }} >
          <div className="profile-tab-nav border-right">
            <div className="p-4 d-flex flex-column align-items-center">
              <div className="img-circle text-center mb-3">
                <Avatar alt="Avatar" className="shadow " />
              </div>
              <h4 className="text-center">{nameValue}</h4>
            </div>
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a
                className={`nav-link ${activeTab === "account" ? "active" : ""}`}
                id="account-tab"
                data-toggle="pill"
                href="#account"
                role="tab"
                aria-controls="account"
                aria-selected={activeTab === "account"}
                onClick={() => handleTabClick("account")}
              >
                <i className="fa fa-home text-center mr-1"></i>
                Account
              </a>
              <a
                className={`nav-link ${activeTab === "password" ? "active" : ""}`}
                id="password-tab"
                data-toggle="pill"
                href="#password"
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
            <div className={`tab-pane fade ${activeTab === "account" ? "show active" : ""}`} id="account" role="tabpanel" aria-labelledby="account-tab">
              <h3 className="mb-4">Account Settings</h3>
              <div className="row">
                <div className="col-md-6">
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
            </div>
            <div className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`} id="password" role="tabpanel" aria-labelledby="password-tab">
          <h3 className="mb-4">Password Settings</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Old Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    className="form-control"
                    value={passwordFields.oldPassword}
                    onChange={(e) => setPasswordFields({ ...passwordFields, oldPassword: e.target.value })}
                  />
                  <IconButton onClick={() => togglePasswordVisibility("oldPassword")}>
                    {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>
            </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input-container">
                    <input
                    type={showPassword.newPassword ? "text" : "password"}
                    className="form-control"
                    value={passwordFields.newPassword}
                    onChange={(e) => setPasswordFields({ ...passwordFields, newPassword: e.target.value })}
                  />
                      <IconButton onClick={() => togglePasswordVisibility("newPassword")}
                       >
                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-input-container">
                    <input
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                    className="form-control"
                    value={passwordFields.confirmNewPassword}
                    onChange={(e) => setPasswordFields({ ...passwordFields, confirmNewPassword: e.target.value })}
                  />
                      <IconButton onClick={() => togglePasswordVisibility("confirmNewPassword")}
                       >
                        {showPassword.confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>
                </div>
                {/* More form groups for other fields */}
              </div>
              <div>
                <button className="btn btn-primary" onClick={handlePasswordUpdate}>Update</button>
                <button className="btn btn-light"  onClick={handlePasswordCancel}>Cancel</button>
              </div>
              {/* Password settings form */}
            </div>
            {/* Add more tab panes for other sections */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setting;
