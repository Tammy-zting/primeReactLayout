import React from "react";
import { progressWithByParams, getProgressPoint, } from "../../../helpers/bar-helper";
import { BarDisplay } from "./bar-display";
import { BarDateHandle } from "./bar-date-handle";
import { BarProgressHandle } from "./bar-progress-handle";
import styles from "./bar.module.css";
export const Bar = ({ task, isProgressChangeable, isDateChangeable, onEventStart, isSelected, }) => {
    const progressWidth = progressWithByParams(task.x1, task.x2, task.progress);
    const progressPoint = getProgressPoint(progressWidth + task.x1, task.y, task.height);
    const handleHeight = task.height - 2;
    return (React.createElement("g", { className: styles.barWrapper, tabIndex: 0 },
        React.createElement(BarDisplay, { x: task.x1, y: task.y, width: task.x2 - task.x1, height: task.height, progressWidth: progressWidth, barCornerRadius: task.barCornerRadius, styles: task.styles, isSelected: isSelected, onMouseDown: e => {
                isDateChangeable && onEventStart("move", task, e);
            } }),
        React.createElement("g", { className: "handleGroup" },
            isDateChangeable && (React.createElement("g", null,
                React.createElement(BarDateHandle, { x: task.x1 + 1, y: task.y + 1, width: task.handleWidth, height: handleHeight, barCornerRadius: task.barCornerRadius, onMouseDown: e => {
                        onEventStart("start", task, e);
                    } }),
                React.createElement(BarDateHandle, { x: task.x2 - task.handleWidth - 1, y: task.y + 1, width: task.handleWidth, height: handleHeight, barCornerRadius: task.barCornerRadius, onMouseDown: e => {
                        onEventStart("end", task, e);
                    } }))),
            isProgressChangeable && (React.createElement(BarProgressHandle, { progressPoint: progressPoint, onMouseDown: e => {
                    onEventStart("progress", task, e);
                } })))));
};
