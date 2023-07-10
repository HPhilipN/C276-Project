import React from "react";
import PickMeals from "./assets/pick-meals-image.png";
import ChooseMeals from "./assets/choose-image.png";
import Cookbook from "./assets/cookbook-image.png";

const Work = () => {
  // Array containing information about how the app works
  const workInfoData = [
    {
      image: PickMeals,
      title: "Recipes",
      text:
        "Create and upload your own tasty recipes and share them with other food enthusiasts!",
    },
    {
      image: ChooseMeals,
      title: "Search",
      text: "Can't decide what to eat? Use the handy recipe search to find simple and delicious meals just a few clicks away!",
    },
    {
      image: Cookbook,
      title: "Cookbook",
      text: "Create a cookbook out of recipes you've bookmarked and cherish the memories of a good meal!",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Replicake is the perfect place for cooking enthusiasts to find and upload their own meal recipes, ranging
          anywhere from exquisite desserts to a good bowl of macaroni!
        </p>
      </div>
      <div className="work-section-bottom">
        {/* Mapping over the workInfoData array and rendering the information */}
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p className="work-section-text">{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
