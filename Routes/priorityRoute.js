const express = require('express');
const priorityRouter = express.Router();
const { CalculateProperty ,CalculateGanttChartMethod, CalculateGanttChartPreemptiveMethod } = require("../controller/priorityController");

priorityRouter.route("/property").post(CalculateProperty);
priorityRouter.route("/ganttChart").post(CalculateGanttChartMethod);
priorityRouter.route("/preemptive/ganttChart").post(CalculateGanttChartPreemptiveMethod);
module.exports = priorityRouter;