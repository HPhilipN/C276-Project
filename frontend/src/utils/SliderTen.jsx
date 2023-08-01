import React, { useState } from "react";
import Slider from "@mui/material/Slider";
const sliderMarks = [
    { value: 15, label: "15" },
    { value: 30, label: "30" },
    { value: 45, label: "45" },
    { value: 60, label: "60" },
    { value: 75, label: "75" },
    { value: 90, label: "90" },
    { value: 105, label: "105" },
    { value: 120, label: "120" },
    { value: 135, label: "135" },
    { value: 150, label: "150" },
    { value: 165, label: "∞" },
  ];

const SliderTen = (props) => {
    const [sliderValue, setSliderValue] = useState(165);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        props.onChange(newValue);
    };

    return <Slider
        defaultValue={props.value}
        step={15}
        marks={sliderMarks}
        min={15}
        max={165}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        sx={{color: "#FE9E0D"}}
    />
}
export default SliderTen;