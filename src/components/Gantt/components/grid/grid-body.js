import React from "react";
import { addToDate } from "../../helpers/date-helper";
import styles from "./grid.module.css";
export const GridBody = ({ tasks, dates, rowHeight, svgWidth, columnWidth, todayColor, }) => {
    let y = 0;
    const gridRows = [];
    const rowLines = [
        React.createElement("line", { key: "RowLineFirst", x: "0", y1: 0, x2: svgWidth, y2: 0, className: styles.gridRowLine }),
    ];
    for (const task of tasks) {
        gridRows.push(React.createElement("rect", { key: "Row" + task.id, x: "0", y: y, width: svgWidth, height: rowHeight, className: styles.gridRow }));
        rowLines.push(React.createElement("line", { key: "RowLine" + task.id, x: "0", y1: y + rowHeight, x2: svgWidth, y2: y + rowHeight, className: styles.gridRowLine }));
        y += rowHeight;
    }
    const now = new Date();
    let tickX = 0;
    const ticks = [];
    let today = React.createElement("rect", null);
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        ticks.push(React.createElement("line", { key: date.getTime(), x1: tickX, y1: 0, x2: tickX, y2: y, className: styles.gridTick }));
        if ((i + 1 !== dates.length &&
            date.getTime() < now.getTime() &&
            dates[i + 1].getTime() >= now.getTime()) ||
            // if current date is last
            (i !== 0 &&
                i + 1 === dates.length &&
                date.getTime() < now.getTime() &&
                addToDate(date, date.getTime() - dates[i - 1].getTime(), "millisecond").getTime() >= now.getTime())) {
            today = (React.createElement("rect", { x: tickX, y: 0, width: columnWidth, height: y, fill: todayColor }));
        }
        tickX += columnWidth;
    }
    return (React.createElement("g", { className: "gridBody" },
        React.createElement("g", { className: "rows" }, gridRows),
        React.createElement("g", { className: "rowLines" }, rowLines),
        React.createElement("g", { className: "ticks" }, ticks),
        React.createElement("g", { className: "today" }, today)));
};
