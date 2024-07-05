const { json } = require("express");
const { CalculateGanttChart } = require("../middleware/rr");
const {
  calculateCompletionTimeAverageRR,
  calculateTurnaroundTimeAverageRR,
  calculateWaitingTimeAverageRR,
  calculateResponseTimeAverageRR,
  calculateAllAveragesRR
} = require("../middleware/rrProperty");

exports.CalculateGanttChartMethod = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const timer = processes[0].timeQuantum[0];

  const data = CalculateGanttChart(processes, timer);
  res.status(200).json({
    sucess: true,
    GanttChart: data
  });
}

exports.CalculateProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const quantum = processes[0].timeQuantum[0];
  const data = calculateAllAveragesRR(processes, quantum);
  res.status(200).json({
    sucess: true,
    property: data
  });
}