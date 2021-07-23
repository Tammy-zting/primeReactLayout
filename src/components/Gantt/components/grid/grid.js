import React from "react";
import { GridBody } from "./grid-body";
export const Grid = props => {
    return (React.createElement("g", { className: "grid" },
        React.createElement(GridBody, Object.assign({}, props))));
};
