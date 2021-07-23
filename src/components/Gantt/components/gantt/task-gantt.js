import React, { useRef, useEffect } from "react";
import { Grid } from "../grid/grid";
import { Calendar } from "../calendar/calendar";
import { TaskGanttContent } from "./task-gantt-content";
import styles from "./gantt.module.css";
export const TaskGantt = ({ gridProps, calendarProps, barProps, ganttHeight, scrollY, scrollX, }) => {
    const ganttSVGRef = useRef(null);
    const horizontalContainerRef = useRef(null);
    const verticalGanttContainerRef = useRef(null);
    const newBarProps = Object.assign(Object.assign({}, barProps), { svg: ganttSVGRef });
    useEffect(() => {
        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = scrollY;
        }
    }, [scrollY]);
    useEffect(() => {
        if (verticalGanttContainerRef.current) {
            verticalGanttContainerRef.current.scrollLeft = scrollX;
        }
    }, [scrollX]);
    return (React.createElement("div", { className: styles.ganttVerticalContainer, ref: verticalGanttContainerRef },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: gridProps.svgWidth, height: calendarProps.headerHeight, fontFamily: barProps.fontFamily },
            React.createElement(Calendar, Object.assign({}, calendarProps))),
        React.createElement("div", { ref: horizontalContainerRef, className: styles.horizontalContainer, style: ganttHeight
                ? { height: ganttHeight, width: gridProps.svgWidth }
                : { width: gridProps.svgWidth } },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: gridProps.svgWidth, height: barProps.rowHeight * barProps.tasks.length, fontFamily: barProps.fontFamily, ref: ganttSVGRef },
                React.createElement(Grid, Object.assign({}, gridProps)),
                React.createElement(TaskGanttContent, Object.assign({}, newBarProps))))));
};