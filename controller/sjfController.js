const { json } = require("express");
const { CalculateGanttChart } = require("../middleware/sjf");

const {
  calculateCompletionTimeAverageSJF,
  calculateTurnaroundTimeAverageSJF,
  calculateWaitingTimeAverageSJF,
  calculateResponseTimeAverageSJF,
  calculateAllAveragesSJF
} = require("../middleware/sjfProperty");



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
  const data = calculateCompletionTimeAverageSJF(processes);
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
  const data = calculateTurnaroundTimeAverageSJF(processes);
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
  const data = calculateWaitingTimeAverageSJF(processes);
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
  const data = calculateResponseTimeAverageSJF(processes);
  res.status(200).json({
    sucess: true,
    averageResponseTime: data
  });
}


exports.calculateProperty = async(req ,res)=>{
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = calculateAllAveragesSJF(processes);
  res.status(200).json({
    sucess: true,
    property: data
  });
}

