const express = require('express');
const sjfRouter = express.Router();
const {CalculateGanttChartMethod } = require("../controller/sjfController");

const { CalculateCTProperty, CalculateTTProperty, CalculateWTProperty, CalculateRTProperty, calculateProperty } = require("../controller/sjfController");


sjfRouter.route("/ganttChart").post(CalculateGanttChartMethod);
sjfRouter.route("/completionTime").post(CalculateCTProperty);
sjfRouter.route("/turnaroundTime").post(CalculateTTProperty);
sjfRouter.route("/waitingTime").post(CalculateWTProperty);
sjfRouter.route("/responseTime").post(CalculateRTProperty);
sjfRouter.route("/property").post(calculateProperty);

module.exports = sjfRouter;
