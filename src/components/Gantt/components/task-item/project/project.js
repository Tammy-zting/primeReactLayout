import React from "react";
import { progressWithByParams } from "../../../helpers/bar-helper";
import styles from "./project.module.css";
export const Project = ({ task, isSelected }) => {
    const barColor = isSelected
        ? task.styles.backgroundSelectedColor
        : task.styles.backgroundColor;
    const processColor = isSelected
        ? task.styles.progressSelectedColor
        : task.styles.progressColor;
    const progressWidth = progressWithByParams(task.x1, task.x2, task.progress);
    const projectWith = task.x2 - task.x1;
    const projectLeftTriangle = [
        task.x1,
        task.y + task.height / 2 - 1,
        task.x1,
        task.y + task.height,
        task.x1 + 15,
        task.y + task.height / 2 - 1,
    ].join(",");
    const projectRightTriangle = [
        task.x2,
        task.y + task.height / 2 - 1,
        task.x2,
        task.y + task.height,
        task.x2 - 15,
        task.y + task.height / 2 - 1,
    ].join(",");
    return (React.createElement("g", { tabIndex: 0, className: styles.projectWrapper },
        React.createElement("rect", { fill: barColor, x: task.x1, width: projectWith, y: task.y, height: task.height, rx: task.barCornerRadius, ry: task.barCornerRadius, className: styles.projectBackground }),
        React.createElement("rect", { x: task.x1, width: progressWidth, y: task.y, height: task.height, ry: task.barCornerRadius, rx: task.barCornerRadius, fill: processColor }),
        React.createElement("rect", { fill: barColor, x: task.x1, width: projectWith, y: task.y, height: task.height / 2, rx: task.barCornerRadius, ry: task.barCornerRadius, className: styles.projectTop }),
        React.createElement("polygon", { className: styles.projectTop, points: projectLeftTriangle, fill: barColor }),
        React.createElement("polygon", { className: styles.projectTop, points: projectRightTriangle, fill: barColor })));
};
