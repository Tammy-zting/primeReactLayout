import React from "react";
import styles from "./task-list-table.module.css";
export const TaskListTableDefault = ({ rowHeight, rowWidth, tasks, fontFamily, fontSize, locale }) => {
    const dateTimeOptions = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return (React.createElement("div", { className: styles.taskListWrapper, style: {
            fontFamily: fontFamily,
            fontSize: fontSize,
        } }, tasks.map(t => {
        return (React.createElement("div", { className: styles.taskListTableRow, style: { height: rowHeight }, key: `${t.id}row` },
            React.createElement("div", { className: styles.taskListCell, style: {
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                }, title: t.name },
                "\u00A0",
                t.name),
            React.createElement("div", { className: styles.taskListCell, style: {
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                } },
                "\u00A0",
                t.start.toLocaleDateString(locale, dateTimeOptions)),
            React.createElement("div", { className: styles.taskListCell, style: {
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                } },
                "\u00A0",
                t.end.toLocaleDateString(locale, dateTimeOptions))));
    })));
};
