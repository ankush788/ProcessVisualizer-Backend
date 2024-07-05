const express = require('express');
const roundRobinRouter = express.Router();
const { CalculateGanttChartMethod } = require("../controller/rrController");
const {CalculateProperty } = require("../controller/rrController");

roundRobinRouter.route("/ganttChart").post(CalculateGanttChartMethod);
roundRobinRouter.route("/property").post(CalculateProperty);


module.exports = roundRobinRouter;