import React, { useContext, useState } from 'react';
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Navbar from "./Navbar";
import "./styles/Setting.css";
import { UserContext } from "./UserContext";
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
  const { signInStatus, isChef, isModerator } = useContext(UserContext);

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
              <h4 className="text-center">Kiran Acharya</h4>
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
                    <label>First Name</label>
                    <input type="text" className="form-control" defaultValue="Kiran" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" defaultValue="Acharya" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" defaultValue="" />
                  </div>
                </div>
                {/* More form groups for other fields */}
              </div>
              <div>
                <button className="btn btn-primary">Update</button>
                <button className="btn btn-light">Cancel</button>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`} id="password" role="tabpanel" aria-labelledby="password-tab">
              <h3 className="mb-4">Password Settings</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Old Password</label>
                    <div className="password-input-container">
                      <input type={showPassword.oldPassword ? "text" : "password"} className="form-control" />
                      <IconButton onClick={() => togglePasswordVisibility("oldPassword")}
                        >
                        {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input-container">
                      <input type={showPassword.newPassword ? "text" : "password"} className="form-control" />
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
                      <input type={showPassword.confirmNewPassword ? "text" : "password"} className="form-control" />
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
                <button className="btn btn-primary">Update</button>
                <button className="btn btn-light">Cancel</button>
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
