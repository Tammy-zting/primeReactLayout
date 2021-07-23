import React, { useEffect, useRef, useState } from "react";
import { Bar } from "./bar/bar";
import { BarSmall } from "./bar/bar-small";
import { Milestone } from "./milestone/milestone";
import { Project } from "./project/project";
import style from "./task-list.module.css";
export const TaskItem = props => {
    const { task, arrowIndent, isDelete, taskHeight, isSelected, onEventStart, } = Object.assign({}, props);
    const textRef = useRef(null);
    const [taskItem, setTaskItem] = useState(React.createElement("div", null));
    const [isTextInside, setIsTextInside] = useState(true);
    useEffect(() => {
        switch (task.typeInternal) {
            case "milestone":
                setTaskItem(React.createElement(Milestone, Object.assign({}, props)));
                break;
            case "project":
                setTaskItem(React.createElement(Project, Object.assign({}, props)));
                break;
            case "smalltask":
                setTaskItem(React.createElement(BarSmall, Object.assign({}, props)));
                break;
            default:
                setTaskItem(React.createElement(Bar, Object.assign({}, props)));
                break;
        }
    }, [task, isSelected]);
    useEffect(() => {
        if (textRef.current) {
            setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
        }
    }, [textRef, task]);
    const getX = () => {
        const width = task.x2 - task.x1;
        const hasChild = task.barChildren.length > 0;
        return isTextInside
            ? task.x1 + width * 0.5
            : task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    };
    return (React.createElement("g", { onKeyDown: e => {
            switch (e.key) {
                case "Delete": {
                    if (isDelete)
                        onEventStart("delete", task, e);
                    break;
                }
            }
            e.stopPropagation();
        }, onMouseEnter: e => {
            onEventStart("mouseenter", task, e);
        }, onMouseLeave: e => {
            onEventStart("mouseleave", task, e);
        }, onDoubleClick: e => {
            onEventStart("dblclick", task, e);
        }, onFocus: () => {
            onEventStart("select", task);
        } },
        taskItem,
        React.createElement("text", { x: getX(), y: task.y + taskHeight * 0.5, className: isTextInside
                ? style.barLabel
                : style.barLabel && style.barLabelOutside, ref: textRef }, task.name)));
};
