import React from "react";
import Slider from "@mui/material/Slider";

const SliderTen = () => {
    return <Slider
        min={1}
        max={10}
        valueLabelDisplay="on"
        sx={{color: "#FE9E0D"}}
    />
}
export default SliderTen;