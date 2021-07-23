import React from "react";
import style from "./bar.module.css";
export const BarDisplay = ({ x, y, width, height, isSelected, progressWidth, barCornerRadius, styles, onMouseDown, }) => {
    const getProcessColor = () => {
        return isSelected ? styles.progressSelectedColor : styles.progressColor;
    };
    const getBarColor = () => {
        return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
    };
    return (React.createElement("g", { onMouseDown: onMouseDown },
        React.createElement("rect", { x: x, width: width, y: y, height: height, ry: barCornerRadius, rx: barCornerRadius, fill: getBarColor(), className: style.barBackground }),
        React.createElement("rect", { x: x, width: progressWidth, y: y, height: height, ry: barCornerRadius, rx: barCornerRadius, fill: getProcessColor() })));
};
