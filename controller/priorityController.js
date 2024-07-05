const { json } = require("express");
const { CalculateGanttChart, CalculateGanttChartPreemptive } = require("../middleware/priority");
const { calculateAllAveragesPriority } = require("../middleware/priorityProperty");

exports.CalculateGanttChartMethod = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = CalculateGanttChart(processes);
  res.status(200).json({
    sucess: true,
    GanttChart: data
  });
};


exports.CalculateProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  // const quantum = processes[0].timeQuantum[0];
  const data = calculateAllAveragesPriority(processes);
  res.status(200).json({
    sucess: true,
    property: data
  });
}



exports.CalculateGanttChartPreemptiveMethod = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = CalculateGanttChartPreemptive(processes);
  res.status(200).json({
    sucess: true,
    GanttChart: data
  });
}