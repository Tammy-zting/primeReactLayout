import React, { useEffect, useRef } from "react";
export const TaskList = ({ headerHeight, fontFamily, fontSize, rowWidth, rowHeight, scrollY, tasks, selectedTask, setSelectedTask, locale, ganttHeight, taskListRef, horizontalContainerClass, TaskListHeader, TaskListTable, }) => {
    const horizontalContainerRef = useRef(null);
    useEffect(() => {
        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = scrollY;
        }
    }, [scrollY]);
    const headerProps = {
        headerHeight,
        fontFamily,
        fontSize,
        rowWidth,
    };
    const selectedTaskId = selectedTask ? selectedTask.id : "";
    const tableProps = {
        rowHeight,
        rowWidth,
        fontFamily,
        fontSize,
        tasks,
        locale,
        selectedTaskId: selectedTaskId,
        setSelectedTask,
    };
    return (React.createElement("div", { ref: taskListRef },
        React.createElement(TaskListHeader, Object.assign({}, headerProps)),
        React.createElement("div", { ref: horizontalContainerRef, className: horizontalContainerClass, style: ganttHeight ? { height: ganttHeight } : {} },
            React.createElement(TaskListTable, Object.assign({}, tableProps)))));
};
