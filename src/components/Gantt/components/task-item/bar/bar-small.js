import React from "react";
import { progressWithByParams, getProgressPoint, } from "../../../helpers/bar-helper";
import { BarDisplay } from "./bar-display";
import { BarProgressHandle } from "./bar-progress-handle";
import styles from "./bar.module.css";
export const BarSmall = ({ task, isProgressChangeable, isDateChangeable, onEventStart, isSelected, }) => {
    const progressWidth = progressWithByParams(task.x1, task.x2, task.progress);
    const progressPoint = getProgressPoint(progressWidth + task.x1, task.y, task.height);
    return (React.createElement("g", { className: styles.barWrapper, tabIndex: 0 },
        React.createElement(BarDisplay, { x: task.x1, y: task.y, width: task.x2 - task.x1, height: task.height, progressWidth: progressWidth, barCornerRadius: task.barCornerRadius, styles: task.styles, isSelected: isSelected, onMouseDown: e => {
                isDateChangeable && onEventStart("move", task, e);
            } }),
        React.createElement("g", { className: "handleGroup" }, isProgressChangeable && (React.createElement(BarProgressHandle, { progressPoint: progressPoint, onMouseDown: e => {
                onEventStart("progress", task, e);
            } })))));
};
