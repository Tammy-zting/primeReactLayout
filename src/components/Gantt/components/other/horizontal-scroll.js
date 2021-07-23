import React, { useRef, useEffect } from "react";
import styles from "./horizontal-scroll.module.css";
export const HorizontalScroll = ({ scroll, svgWidth, taskListWidth, onScroll }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scroll;
        }
    }, [scroll]);
    return (React.createElement("div", { style: { marginLeft: taskListWidth }, className: styles.scroll, onScroll: onScroll, ref: scrollRef },
        React.createElement("div", { style: { width: svgWidth, height: 1 } })));
};
