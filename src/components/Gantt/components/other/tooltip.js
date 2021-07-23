import React, { useRef, useEffect, useState } from "react";
import styles from "./tooltip.module.css";
export const Tooltip = ({ task, rowHeight, svgContainerHeight, svgContainerWidth, scrollX, scrollY, arrowIndent, fontSize, fontFamily, headerHeight, taskListWidth, TooltipContent, }) => {
    const tooltipRef = useRef(null);
    const [relatedY, setRelatedY] = useState(0);
    const [relatedX, setRelatedX] = useState(0);
    useEffect(() => {
        if (tooltipRef.current) {
            let newRelatedX = task.x2 + arrowIndent + arrowIndent * 0.5 + taskListWidth - scrollX;
            let newRelatedY = task.index * rowHeight - scrollY + headerHeight;
            const tooltipHeight = tooltipRef.current.offsetHeight * 1.1;
            const tooltipWidth = tooltipRef.current.offsetWidth * 1.1;
            const tooltipLowerPoint = tooltipHeight + newRelatedY - scrollY;
            const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
            const fullChartWidth = taskListWidth + svgContainerWidth;
            if (tooltipLeftmostPoint > fullChartWidth) {
                newRelatedX =
                    task.x1 +
                        taskListWidth -
                        arrowIndent -
                        arrowIndent * 0.5 -
                        scrollX -
                        tooltipWidth;
            }
            if (newRelatedX < taskListWidth) {
                newRelatedX = svgContainerWidth + taskListWidth - tooltipWidth;
                newRelatedY += rowHeight;
            }
            else if (tooltipLowerPoint > svgContainerHeight - scrollY) {
                newRelatedY = svgContainerHeight - tooltipHeight;
            }
            setRelatedY(newRelatedY);
            setRelatedX(newRelatedX);
        }
    }, [
        tooltipRef.current,
        task,
        arrowIndent,
        scrollX,
        scrollY,
        headerHeight,
        taskListWidth,
        rowHeight,
        svgContainerHeight,
        svgContainerWidth,
    ]);
    return (React.createElement("div", { ref: tooltipRef, className: relatedX
            ? styles.tooltipDetailsContainer
            : styles.tooltipDetailsContainerHidden, style: { left: relatedX, top: relatedY } },
        React.createElement(TooltipContent, { task: task, fontSize: fontSize, fontFamily: fontFamily })));
};
export const StandardTooltipContent = ({ task, fontSize, fontFamily }) => {
    const style = {
        fontSize,
        fontFamily,
    };
    return (React.createElement("div", { className: styles.tooltipDefaultContainer, style: style },
        React.createElement("b", { style: { fontSize: fontSize + 6 } }, `${task.name}: ${task.start.getDate()}-${task.start.getMonth() + 1}-${task.start.getFullYear()} - ${task.end.getDate()}-${task.end.getMonth() + 1}-${task.end.getFullYear()}`),
        task.end.getTime() - task.start.getTime() !== 0 && (React.createElement("p", { className: styles.tooltipDefaultContainerParagraph }, `Duration: ${~~((task.end.getTime() - task.start.getTime()) /
            (1000 * 60 * 60 * 24))} day(s)`)),
        React.createElement("p", { className: styles.tooltipDefaultContainerParagraph }, !!task.progress && `Progress: ${task.progress} %`)));
};
