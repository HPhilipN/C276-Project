import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const SliderReplicake = (props) => {
    let sliderMarks = []
    for (let markNumber = 0; markNumber < props.finiteMarkCount; markNumber += 1) {
        let valPushed = props.min + markNumber * props.gap
        sliderMarks.push({ value: valPushed, label: valPushed.toString() });
    }

    if (props.hasInfinite) {
        sliderMarks.push({ value: props.min + props.finiteMarkCount * props.gap, label: "∞"})
    }
    const [sliderValue, setSliderValue] = useState(165);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        props.onChange(newValue);
    };

    return <Slider
        defaultValue={props.value}
        step={props.gap}
        marks={sliderMarks}
        min={props.min}
        max={props.min + props.gap * (props.hasInfinite ? props.finiteMarkCount : props.finiteMarkCount - 1)}
        onChange={handleSliderChange}
        valueLabelDisplay="off"
        sx={{color: "#FE9E0D"}}
    />
}
export default SliderReplicake;