import React from "react";


const ErrorMessageHome = () => {
   return (
    <div className="work-section-wrapper">
    <div className="work-section-top">
       <h1 className="primary-heading">Featured Recipe</h1>
    </div>
    <div className="testimonial-section-bottom">
       <p>Failed to load the featured recipe. Please try again later.</p>
       <div className="recipe-image"></div>

       <div className="ingredients-list"></div>
       <div className="about-buttons-container"></div>
    </div>
 </div>
   );
};

export default ErrorMessageHome;
