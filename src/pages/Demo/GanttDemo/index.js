//参考https://github.com/MaTeMaTuK/gantt-task-react
import React,{useState} from "react";
import { ViewMode, Gantt } from "../../../components/Gantt";
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "../../../components/Gantt/index.css"

//Init
const GanttDemo = () => {
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(initTasks());
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const onTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const onTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const onProgressChange = async (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  //双击事件
  const onDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const onSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  return (
    <div>
      <h4>甘特图</h4>
      <h5><a href="https://github.com/MaTeMaTuK/gantt-task-react">参考github源码</a></h5>
      {/* 工具条 */}
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      {/* 甘特图 */}
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={onTaskChange}
        onDelete={onTaskDelete}
        onProgressChange={onProgressChange}
        onDoubleClick={onDblClick}
        onSelect={onSelect}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        // ganttHeight={300}  可设置高度
      />
    </div>
  );
};

export default GanttDemo;
