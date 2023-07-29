import React from "react";

const HealthCircle = ({ healthScore }) => {
   let circleColor;

   if (healthScore >= 0 && healthScore <= 100) {
      circleColor = "#A1FF69";
   } else {
      throw new Error("Invalid healh Score value. healthScore should range from 0 to 100");
   }

   const circleStyle = {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: "1px solid #ccc",
      backgroundColor: circleColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
      padding: "1.1rem",
   };

   return (
      <div style={circleStyle}>
         <strong>{healthScore}</strong>
      </div>
   );
};

export default HealthCircle;
