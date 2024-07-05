const { json } = require("express");
const { CalculateGanttChart } = require("../middleware/fcfs");
const { calculateCompletionTimeAverage, calculateTurnaroundTimeAverage, calculateWaitingTimeAverage, calculateResponseTimeAverage, calculateAllAverages } = require("../middleware/fcfsProperty");

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
}

exports.CalculateCTProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateCompletionTimeAverage(processes);
  res.status(200).json({
    sucess: true,
    averageCompletionTime: data
  });
}

exports.CalculateTTProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateTurnaroundTimeAverage(processes);
  res.status(200).json({
    sucess: true,
    averageTurnaroundTime: data
  });
}

exports.CalculateWTProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateWaitingTimeAverage(processes);
  res.status(200).json({
    sucess: true,
    averageWaitingTime: data
  });
}

exports.CalculateRTProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateResponseTimeAverage(processes);
  res.status(200).json({
    sucess: true,
    averageResponseTime: data
  });
}

exports.CalculateProperty = async (req, res) => {
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateAllAverages(processes);
  res.status(200).json({
    sucess: true,
    property: data
  });
}