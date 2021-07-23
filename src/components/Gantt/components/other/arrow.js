import React from "react";
export const Arrow = ({ taskFrom, taskTo, rowHeight, taskHeight, arrowIndent, }) => {
    const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
    const taskToEndPosition = taskTo.y + taskHeight / 2;
    const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  H ${taskTo.x1 - arrowIndent} 
  V ${taskToEndPosition} 
  h ${arrowIndent}`;
    const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
    return (React.createElement("g", { className: "arrow" },
        React.createElement("path", { strokeWidth: "1.5", d: path, fill: "none" }),
        React.createElement("polygon", { points: trianglePoints })));
};
