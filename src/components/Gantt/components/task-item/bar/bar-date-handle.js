import React from "react";
import styles from "./bar.module.css";
export const BarDateHandle = ({ x, y, width, height, barCornerRadius, onMouseDown, }) => {
    return (React.createElement("rect", { x: x, y: y, width: width, height: height, className: styles.barHandle, ry: barCornerRadius, rx: barCornerRadius, onMouseDown: onMouseDown }));
};
