import React from "react";
import BannerBackground from "./assets/home-banner-background.png";
import BannerImage from "./assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import "./styles/Home.css";
import Work from "./Work";
import Footer from "./Footer";
//hi
const Home = () => {
   return (
      <div className="home-container">
         <Navbar />
         <div className="home">
            <div className="home-banner-container">
               <div className="home-bannerImage-container">
                  <img src={BannerBackground} alt="" />
               </div>
               <div className="home-text-section">
                  <h1 className="primary-heading text-left">
                     Replicake Your Favourite Recipes
                  </h1>
                  <p className="primary-text text-left">
                     Never run out of recipe ideas with the power of Replicake!
                  </p>
                  <a href="/dashboard">
                     <button className="secondary-button">
                        Find Recipes Now<FiArrowRight />
                     </button>
                  </a>
               </div>
               <div className="home-image-section">
                  <img src={BannerImage} alt="" />
               </div>
            </div>
            <Work />
            <Footer />
         </div>
      </div>
   );
};

export default Home;
