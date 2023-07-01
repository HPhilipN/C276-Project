import React from "react";
import Work from "./Work.jsx";
import Footer from "./Footer.jsx";
import BannerBackground from "./assets/home-banner-background.png";
import BannerImage from "./assets/home-banner-image.png";
import Navbar from "./Navbar.jsx";
import { FiArrowRight } from "react-icons/fi";
import "./App.css";

const Home = () => {
  return (
    <div className="App">
        <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p>
          <button className="secondary-button">
            Search Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Work />
      <Footer />
    </div>
  );
};

export default Home;
