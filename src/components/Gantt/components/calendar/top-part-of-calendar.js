import React from "react";
import styles from "./calendar.module.css";
export const TopPartOfCalendar = ({ value, x1Line, y1Line, y2Line, xText, yText, }) => {
    return (React.createElement("g", { className: "calendarTop" },
        React.createElement("line", { x1: x1Line, y1: y1Line, x2: x1Line, y2: y2Line, className: styles.calendarTopTick, key: value + "line" }),
        React.createElement("text", { key: value + "text", y: yText, x: xText, className: styles.calendarTopText }, value)));
};
