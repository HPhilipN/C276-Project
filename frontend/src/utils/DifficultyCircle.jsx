import React from "react";

const DifficultyCircle = ({ difficulty }) => {
   let circleColor;

   if (difficulty >= 0 && difficulty <= 3) {
      circleColor = "#A1FF69";
   } else if (difficulty >= 4 && difficulty <= 7) {
      circleColor = "#FFFF61";
   } else if (difficulty >= 8 && difficulty <= 10) {
      circleColor = "#FF7878";
   } else {
      throw new Error("Invalid difficulty value. Difficulty should range from 0 to 10.");
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
   };

   return (
      <div style={circleStyle}>
         <strong>{difficulty}</strong>
      </div>
   );
};

export default DifficultyCircle;
