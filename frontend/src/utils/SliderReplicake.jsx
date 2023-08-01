import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const SliderReplicake = (props) => {
    let sliderMarks = []
    for (let markNumber = 1; markNumber <= props.finiteMarkCount; markNumber += 1) {
        sliderMarks.push({ value: markNumber * props.gap, label: (markNumber * props.gap).toString() });
    }

    if (props.hasInfinite) {
        sliderMarks.push({ value: props.finiteMarkCount * (props.gap + 1), label: "∞"})
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
        min={props.gap}
        max={props.gap * (props.hasInfinite ? props.finiteMarkCount + 1 : props.finiteMarkCount)}
        onChange={handleSliderChange}
        valueLabelDisplay="off"
        sx={{color: "#FE9E0D"}}
    />
}
export default SliderReplicake;