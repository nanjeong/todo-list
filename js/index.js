import { ScheduleColumn } from "./components/schedule/scheduleColumn.js";
import { mouseDownEventHandler } from "./components/schedule/scheduleCardDrag.js";
import { scheduleModel, applyHistory2Server, applyHistory2ServerInterval } from "./components/model/scheduleModel.js";

const $main = document.querySelector("#main");
const scheduleColumns = [];

scheduleModel.forEach((scheduleColumnData) => {
    const scheduleColumn = new ScheduleColumn($main, scheduleColumnData.id);
    scheduleColumns.push(scheduleColumn);
});

$main.addEventListener("mousedown", mouseDownEventHandler);
window.addEventListener("beforeunload", applyHistory2Server)
applyHistory2ServerInterval()
