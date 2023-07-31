import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const SliderTen = (props) => {
    const [sliderValue, setSliderValue] = useState(5);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        props.onChange(newValue);
    };

    return <Slider
        min={1}
        max={10}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        sx={{color: "#FE9E0D"}}
    />
}
export default SliderTen;