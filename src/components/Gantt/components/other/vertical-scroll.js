import React, { useRef, useEffect } from "react";
import styles from "./vertical-scroll.module.css";
export const VerticalScroll = ({ scroll, ganttHeight, ganttFullHeight, headerHeight, onScroll }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scroll;
        }
    }, [scroll]);
    return (React.createElement("div", { style: { height: ganttHeight, marginTop: headerHeight }, className: styles.scroll, onScroll: onScroll, ref: scrollRef },
        React.createElement("div", { style: { height: ganttFullHeight, width: 1 } })));
};
