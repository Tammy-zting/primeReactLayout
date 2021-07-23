import React, { useEffect, useState } from "react";
import { Arrow } from "../other/arrow";
import { handleTaskBySVGMouseEvent } from "../../helpers/bar-helper";
import { isKeyboardEvent } from "../../helpers/other-helper";
import { TaskItem } from "../task-item/task-item";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export const TaskGanttContent = ({ tasks, dates, ganttEvent, selectedTask, rowHeight, columnWidth, timeStep, svg, taskHeight, arrowColor, arrowIndent, fontFamily, fontSize, setGanttEvent, setFailedTask, setSelectedTask, onDateChange, onProgressChange, onDoubleClick, onDelete, }) => {
    var _a;
    const point = (_a = svg === null || svg === void 0 ? void 0 : svg.current) === null || _a === void 0 ? void 0 : _a.createSVGPoint();
    const [xStep, setXStep] = useState(0);
    const [initEventX1Delta, setInitEventX1Delta] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    // create xStep
    useEffect(() => {
        const dateDelta = dates[1].getTime() -
            dates[0].getTime() -
            dates[1].getTimezoneOffset() * 60 * 1000 +
            dates[0].getTimezoneOffset() * 60 * 1000;
        const newXStep = (timeStep * columnWidth) / dateDelta;
        setXStep(newXStep);
    }, [columnWidth, dates, timeStep]);
    useEffect(() => {
        const handleMouseMove = (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!ganttEvent.changedTask || !point || !(svg === null || svg === void 0 ? void 0 : svg.current))
                return;
            event.preventDefault();
            point.x = event.clientX;
            const cursor = point.matrixTransform((_a = svg === null || svg === void 0 ? void 0 : svg.current.getScreenCTM()) === null || _a === void 0 ? void 0 : _a.inverse());
            const { isChanged, changedTask } = handleTaskBySVGMouseEvent(cursor.x, ganttEvent.action, ganttEvent.changedTask, xStep, timeStep, initEventX1Delta);
            if (isChanged) {
                setGanttEvent({ action: ganttEvent.action, changedTask });
            }
        });
        const handleMouseUp = (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const { action, originalSelectedTask, changedTask } = ganttEvent;
            if (!changedTask || !point || !(svg === null || svg === void 0 ? void 0 : svg.current) || !originalSelectedTask)
                return;
            event.preventDefault();
            point.x = event.clientX;
            const cursor = point.matrixTransform((_b = svg === null || svg === void 0 ? void 0 : svg.current.getScreenCTM()) === null || _b === void 0 ? void 0 : _b.inverse());
            const { changedTask: newChangedTask } = handleTaskBySVGMouseEvent(cursor.x, action, changedTask, xStep, timeStep, initEventX1Delta);
            const isNotLikeOriginal = originalSelectedTask.start !== newChangedTask.start ||
                originalSelectedTask.end !== newChangedTask.end ||
                originalSelectedTask.progress !== newChangedTask.progress;
            // remove listeners
            svg.current.removeEventListener("mousemove", handleMouseMove);
            svg.current.removeEventListener("mouseup", handleMouseUp);
            setGanttEvent({ action: "" });
            setIsMoving(false);
            // custom operation start
            let operationSuccess = true;
            if ((action === "move" || action === "end" || action === "start") &&
                onDateChange &&
                isNotLikeOriginal) {
                try {
                    const result = yield onDateChange(newChangedTask);
                    if (result !== undefined) {
                        operationSuccess = result;
                    }
                }
                catch (error) {
                    operationSuccess = false;
                }
            }
            else if (onProgressChange && isNotLikeOriginal) {
                try {
                    const result = yield onProgressChange(newChangedTask);
                    if (result !== undefined) {
                        operationSuccess = result;
                    }
                }
                catch (error) {
                    operationSuccess = false;
                }
            }
            // If operation is failed - return old state
            if (!operationSuccess) {
                setFailedTask(originalSelectedTask);
            }
        });
        if (!isMoving &&
            (ganttEvent.action === "move" ||
                ganttEvent.action === "end" ||
                ganttEvent.action === "start" ||
                ganttEvent.action === "progress") && (svg === null || svg === void 0 ? void 0 : svg.current)) {
            svg.current.addEventListener("mousemove", handleMouseMove);
            svg.current.addEventListener("mouseup", handleMouseUp);
            setIsMoving(true);
        }
    }, [
        ganttEvent,
        xStep,
        initEventX1Delta,
        onProgressChange,
        timeStep,
        onDateChange,
        svg,
        isMoving,
    ]);
    /**
     * Method is Start point of task change
     */
    const handleBarEventStart = (action, task, event) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (!event) {
            if (action === "select") {
                setSelectedTask(task.id);
            }
        }
        // Keyboard events
        else if (isKeyboardEvent(event)) {
            if (action === "delete") {
                if (onDelete) {
                    try {
                        const result = yield onDelete(task);
                        if (result !== undefined && result) {
                            setGanttEvent({ action, changedTask: task });
                        }
                    }
                    catch (error) {
                        console.error("Error on Delete. " + error);
                    }
                }
            }
        }
        // Mouse Events
        else if (action === "mouseenter") {
            if (!ganttEvent.action) {
                setGanttEvent({
                    action,
                    changedTask: task,
                    originalSelectedTask: task,
                });
            }
        }
        else if (action === "mouseleave") {
            if (ganttEvent.action === "mouseenter") {
                setGanttEvent({ action: "" });
            }
        }
        else if (action === "dblclick") {
            !!onDoubleClick && onDoubleClick(task);
        }
        // Change task event start
        else if (action === "move") {
            if (!(svg === null || svg === void 0 ? void 0 : svg.current) || !point)
                return;
            point.x = event.clientX;
            const cursor = point.matrixTransform((_b = svg.current.getScreenCTM()) === null || _b === void 0 ? void 0 : _b.inverse());
            setInitEventX1Delta(cursor.x - task.x1);
            setGanttEvent({
                action,
                changedTask: task,
                originalSelectedTask: task,
            });
        }
        else {
            setGanttEvent({
                action,
                changedTask: task,
                originalSelectedTask: task,
            });
        }
    });
    return (React.createElement("g", { className: "content" },
        React.createElement("g", { className: "arrows", fill: arrowColor, stroke: arrowColor }, tasks.map(task => {
            return task.barChildren.map(child => {
                return (React.createElement(Arrow, { key: `Arrow from ${task.id} to ${tasks[child].id}`, taskFrom: task, taskTo: tasks[child], rowHeight: rowHeight, taskHeight: taskHeight, arrowIndent: arrowIndent }));
            });
        })),
        React.createElement("g", { className: "bar", fontFamily: fontFamily, fontSize: fontSize }, tasks.map(task => {
            return (React.createElement(TaskItem, { task: task, arrowIndent: arrowIndent, taskHeight: taskHeight, isProgressChangeable: !!onProgressChange && !task.isDisabled, isDateChangeable: !!onDateChange && !task.isDisabled, isDelete: !task.isDisabled, onEventStart: handleBarEventStart, key: task.id, isSelected: !!selectedTask && task.id === selectedTask.id }));
        }))));
};
