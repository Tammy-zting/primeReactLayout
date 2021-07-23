import React from "react";
import styles from "./task-list-header.module.css";
export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
    return (React.createElement("div", { className: styles.ganttTable, style: {
            fontFamily: fontFamily,
            fontSize: fontSize,
        } },
        React.createElement("div", { className: styles.ganttTable_Header, style: {
                height: headerHeight - 2,
            } },
            React.createElement("div", { className: styles.ganttTable_HeaderItem, style: {
                    minWidth: rowWidth,
                } }, "\u00A0Name"),
            React.createElement("div", { className: styles.ganttTable_HeaderSeparator, style: {
                    height: headerHeight * 0.5,
                    marginTop: headerHeight * 0.2,
                } }),
            React.createElement("div", { className: styles.ganttTable_HeaderItem, style: {
                    minWidth: rowWidth,
                } }, "\u00A0From"),
            React.createElement("div", { className: styles.ganttTable_HeaderSeparator, style: {
                    height: headerHeight * 0.5,
                    marginTop: headerHeight * 0.25,
                } }),
            React.createElement("div", { className: styles.ganttTable_HeaderItem, style: {
                    minWidth: rowWidth,
                } }, "\u00A0To"))));
};
