import React from "react";
import styles from "./milestone.module.css";
export const Milestone = ({ task, isDateChangeable, onEventStart, isSelected, }) => {
    const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;
    const getBarColor = () => {
        return isSelected
            ? task.styles.backgroundSelectedColor
            : task.styles.backgroundColor;
    };
    return (React.createElement("g", { tabIndex: 0, className: styles.milestoneWrapper },
        React.createElement("rect", { fill: getBarColor(), x: task.x1, width: task.height, y: task.y, height: task.height, rx: task.barCornerRadius, ry: task.barCornerRadius, transform: transform, className: styles.milestoneBackground, onMouseDown: e => {
                isDateChangeable && onEventStart("move", task, e);
            } })));
};