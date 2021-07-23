import React, { useState, useRef, useEffect } from "react";
import { ViewMode } from "../../types/public-types";
import { ganttDateRange, seedDates } from "../../helpers/date-helper";
import { TaskListHeaderDefault } from "../task-list/task-list-header";
import { TaskListTableDefault } from "../task-list/task-list-table";
import { StandardTooltipContent, Tooltip } from "../other/tooltip";
import { VerticalScroll } from "../other/vertical-scroll";
import { TaskList } from "../task-list/task-list";
import { TaskGantt } from "./task-gantt";
import { convertToBarTasks } from "../../helpers/bar-helper";
import styles from "./gantt.module.css";
import { HorizontalScroll } from "../other/horizontal-scroll";
export const Gantt = ({ tasks, headerHeight = 50, columnWidth = 60, listCellWidth = "155px", rowHeight = 50, ganttHeight = 0, viewMode = ViewMode.Day, locale = "en-GB", barFill = 60, barCornerRadius = 3, barProgressColor = "#a3a3ff", barProgressSelectedColor = "#8282f5", barBackgroundColor = "#b8c2cc", barBackgroundSelectedColor = "#aeb8c2", projectProgressColor = "#7db59a", projectProgressSelectedColor = "#59a985", projectBackgroundColor = "#fac465", projectBackgroundSelectedColor = "#f7bb53", milestoneBackgroundColor = "#f1c453", milestoneBackgroundSelectedColor = "#f29e4c", handleWidth = 8, timeStep = 300000, arrowColor = "grey", fontFamily = "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue", fontSize = "14px", arrowIndent = 20, todayColor = "rgba(252, 248, 227, 0.5)", TooltipContent = StandardTooltipContent, TaskListHeader = TaskListHeaderDefault, TaskListTable = TaskListTableDefault, onDateChange, onProgressChange, onDoubleClick, onDelete, onSelect, }) => {
    const wrapperRef = useRef(null);
    const taskListRef = useRef(null);
    const [dateSetup, setDateSetup] = useState(() => {
        const [startDate, endDate] = ganttDateRange(tasks, viewMode);
        return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
    });
    const [taskHeight, setTaskHeight] = useState((rowHeight * barFill) / 100);
    const [taskListWidth, setTaskListWidth] = useState(0);
    const [svgContainerWidth, setSvgContainerWidth] = useState(0);
    const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
    const [barTasks, setBarTasks] = useState([]);
    const [ganttEvent, setGanttEvent] = useState({
        action: "",
    });
    const [selectedTask, setSelectedTask] = useState();
    const [failedTask, setFailedTask] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);
    const svgWidth = dateSetup.dates.length * columnWidth;
    const ganttFullHeight = barTasks.length * rowHeight;
    // task change events
    useEffect(() => {
        const [startDate, endDate] = ganttDateRange(tasks, viewMode);
        const newDates = seedDates(startDate, endDate, viewMode);
        setDateSetup({ dates: newDates, viewMode });
        setBarTasks(convertToBarTasks(tasks, newDates, columnWidth, rowHeight, taskHeight, barCornerRadius, handleWidth, barProgressColor, barProgressSelectedColor, barBackgroundColor, barBackgroundSelectedColor, projectProgressColor, projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor, milestoneBackgroundColor, milestoneBackgroundSelectedColor));
    }, [
        tasks,
        viewMode,
        rowHeight,
        barCornerRadius,
        columnWidth,
        taskHeight,
        handleWidth,
        barProgressColor,
        barProgressSelectedColor,
        barBackgroundColor,
        barBackgroundSelectedColor,
        projectProgressColor,
        projectProgressSelectedColor,
        projectBackgroundColor,
        projectBackgroundSelectedColor,
        milestoneBackgroundColor,
        milestoneBackgroundSelectedColor,
    ]);
    useEffect(() => {
        const { changedTask, action } = ganttEvent;
        if (changedTask) {
            if (action === "delete") {
                setGanttEvent({ action: "" });
                setBarTasks(barTasks.filter(t => t.id !== changedTask.id));
            }
            else if (action === "move" ||
                action === "end" ||
                action === "start" ||
                action === "progress") {
                const prevStateTask = barTasks.find(t => t.id === changedTask.id);
                if (prevStateTask &&
                    (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
                        prevStateTask.end.getTime() !== changedTask.end.getTime() ||
                        prevStateTask.progress !== changedTask.progress)) {
                    // actions for change
                    const newTaskList = barTasks.map(t => t.id === changedTask.id ? changedTask : t);
                    setBarTasks(newTaskList);
                }
            }
        }
    }, [ganttEvent, barTasks]);
    useEffect(() => {
        if (failedTask) {
            setBarTasks(barTasks.map(t => (t.id !== failedTask.id ? t : failedTask)));
            setFailedTask(null);
        }
    }, [failedTask, barTasks]);
    useEffect(() => {
        const newTaskHeight = (rowHeight * barFill) / 100;
        if (newTaskHeight !== taskHeight) {
            setTaskHeight(newTaskHeight);
        }
    }, [rowHeight, barFill, taskHeight]);
    useEffect(() => {
        if (!listCellWidth) {
            setTaskListWidth(0);
        }
        if (taskListRef.current) {
            setTaskListWidth(taskListRef.current.offsetWidth);
        }
    }, [taskListRef, listCellWidth]);
    useEffect(() => {
        if (wrapperRef.current) {
            setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
        }
    }, [wrapperRef, taskListWidth]);
    useEffect(() => {
        if (ganttHeight) {
            setSvgContainerHeight(ganttHeight + headerHeight);
        }
        else {
            setSvgContainerHeight(tasks.length * rowHeight + headerHeight);
        }
    }, [ganttHeight, tasks]);
    // scroll events
    useEffect(() => {
        const handleWheel = (event) => {
            if (event.shiftKey || event.deltaX) {
                const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
                let newScrollX = scrollX + scrollMove;
                if (newScrollX < 0) {
                    newScrollX = 0;
                }
                else if (newScrollX > svgWidth) {
                    newScrollX = svgWidth;
                }
                setScrollX(newScrollX);
                event.preventDefault();
            }
            else {
                let newScrollY = scrollY + event.deltaY;
                if (newScrollY < 0) {
                    newScrollY = 0;
                }
                else if (newScrollY > ganttFullHeight - ganttHeight) {
                    newScrollY = ganttFullHeight - ganttHeight;
                }
                if (newScrollY !== scrollY) {
                    setScrollY(newScrollY);
                    event.preventDefault();
                }
            }
            setIgnoreScrollEvent(true);
        };
        // subscribe if scroll is necessary
        if (wrapperRef.current) {
            wrapperRef.current.addEventListener("wheel", handleWheel, {
                passive: false,
            });
        }
        return () => {
            if (wrapperRef.current) {
                wrapperRef.current.removeEventListener("wheel", handleWheel);
            }
        };
    }, [wrapperRef.current, scrollY, scrollX, ganttHeight, svgWidth]);
    const handleScrollY = (event) => {
        if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
            setScrollY(event.currentTarget.scrollTop);
        }
        setIgnoreScrollEvent(false);
    };
    const handleScrollX = (event) => {
        if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
            setScrollX(event.currentTarget.scrollLeft);
        }
        setIgnoreScrollEvent(false);
    };
    /**
     * Handles arrow keys events and transform it to new scroll
     */
    const handleKeyDown = (event) => {
        event.preventDefault();
        let newScrollY = scrollY;
        let newScrollX = scrollX;
        let isX = true;
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                newScrollY += rowHeight;
                isX = false;
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                newScrollY -= rowHeight;
                isX = false;
                break;
            case "Left":
            case "ArrowLeft":
                newScrollX -= columnWidth;
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                newScrollX += columnWidth;
                break;
        }
        if (isX) {
            if (newScrollX < 0) {
                newScrollX = 0;
            }
            else if (newScrollX > svgWidth) {
                newScrollX = svgWidth;
            }
            setScrollX(newScrollX);
        }
        else {
            if (newScrollY < 0) {
                newScrollY = 0;
            }
            else if (newScrollY > ganttFullHeight - ganttHeight) {
                newScrollY = ganttFullHeight - ganttHeight;
            }
            setScrollY(newScrollY);
        }
        setIgnoreScrollEvent(true);
    };
    /**
     * Task select event
     */
    const handleSelectedTask = (taskId) => {
        const newSelectedTask = barTasks.find(t => t.id === taskId);
        const oldSelectedTask = barTasks.find(t => !!selectedTask && t.id === selectedTask.id);
        if (onSelect) {
            if (oldSelectedTask) {
                onSelect(oldSelectedTask, false);
            }
            if (newSelectedTask) {
                onSelect(newSelectedTask, true);
            }
        }
        setSelectedTask(newSelectedTask);
    };
    const gridProps = {
        columnWidth,
        svgWidth,
        tasks: tasks,
        rowHeight,
        dates: dateSetup.dates,
        todayColor,
    };
    const calendarProps = {
        dateSetup,
        locale,
        viewMode,
        headerHeight,
        columnWidth,
        fontFamily,
        fontSize,
    };
    const barProps = {
        tasks: barTasks,
        dates: dateSetup.dates,
        ganttEvent,
        selectedTask,
        rowHeight,
        taskHeight,
        columnWidth,
        arrowColor,
        timeStep,
        fontFamily,
        fontSize,
        arrowIndent,
        svgWidth,
        setGanttEvent,
        setFailedTask,
        setSelectedTask: handleSelectedTask,
        onDateChange,
        onProgressChange,
        onDoubleClick,
        onDelete,
    };
    const tableProps = {
        rowHeight,
        rowWidth: listCellWidth,
        fontFamily,
        fontSize,
        tasks: barTasks,
        locale,
        headerHeight,
        scrollY,
        ganttHeight,
        horizontalContainerClass: styles.horizontalContainer,
        selectedTask,
        taskListRef,
        setSelectedTask: handleSelectedTask,
        TaskListHeader,
        TaskListTable,
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: styles.wrapper, onKeyDown: handleKeyDown, tabIndex: 0, ref: wrapperRef },
            listCellWidth && React.createElement(TaskList, Object.assign({}, tableProps)),
            React.createElement(TaskGantt, { gridProps: gridProps, calendarProps: calendarProps, barProps: barProps, ganttHeight: ganttHeight, scrollY: scrollY, scrollX: scrollX }),
            ganttEvent.changedTask && (React.createElement(Tooltip, { arrowIndent: arrowIndent, rowHeight: rowHeight, svgContainerHeight: svgContainerHeight, svgContainerWidth: svgContainerWidth, fontFamily: fontFamily, fontSize: fontSize, scrollX: scrollX, scrollY: scrollY, task: ganttEvent.changedTask, headerHeight: headerHeight, taskListWidth: taskListWidth, TooltipContent: TooltipContent })),
            React.createElement(VerticalScroll, { ganttFullHeight: ganttFullHeight, ganttHeight: ganttHeight, headerHeight: headerHeight, scroll: scrollY, onScroll: handleScrollY })),
        React.createElement(HorizontalScroll, { svgWidth: svgWidth, taskListWidth: taskListWidth, scroll: scrollX, onScroll: handleScrollX })));
};
