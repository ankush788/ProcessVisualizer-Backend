const { calculateAllAverages } = require("./fcfsProperty");
const { calculateAllAveragesPriority } = require("./priorityProperty");
const { calculateAllAveragesRR } = require("./rrProperty");
const { calculateAllAveragesSJF } = require("./sjfProperty");

function formatData(algorithm, input) {
  const keyToText = { completionTime: "Completion time: ", turnaroundTime: "Turnaround time: ", waitingTime: "Waiting time: ", responseTime: "Response time: "};
  const averages = [];
  for (const [key, value] of Object.entries(input)) {
    const newKey = keyToText[key.replace(/average([A-Z])/, (match, p1) => p1.toLowerCase())];
    averages.push(`${newKey}${parseFloat(value.toFixed(2))}`);
  }
  return { algorithm, averages };
}

function compareScheduleAlgoHelper(processes) {
  let fcfsData = calculateAllAverages(processes).averages;
  let sjfData = calculateAllAveragesSJF(processes).averages;
  let rrData = calculateAllAveragesRR(processes).averages;
  let priorityData = calculateAllAveragesPriority(processes).averages;

  let combinedAverage = {
    averageCompletionTime: {},
    averageTurnaroundTime: {},
    averageWaitingTime: {},
    averageResponseTime: {}
  };

  const metrics = [
    "averageCompletionTime",
    "averageTurnaroundTime",
    "averageWaitingTime",
    "averageResponseTime"
  ];

  const algorithms = {
    fcfs: fcfsData,
    sjf: sjfData,
    rr: rrData,
    priority: priorityData
  };

  let bestAlgoName = "";
  for (let metric of metrics) {
    let metricMinValue = Number.MAX_SAFE_INTEGER;
    for (let algo in algorithms) {
      combinedAverage[metric][algo] = algorithms[algo][metric];
      if (metricMinValue >= algorithms[algo][metric]) {
        metricMinValue = algorithms[algo][metric];
        bestAlgoName = algo;
      }
    }
    // combinedAverage[metric]["bestAlgo"] = bestAlgoName;
    }
    
    // return combinedAverage;
  const toText = { fcfs: "First Come First Serve, FCFS", sjf: "Shortest Job First, SJF", rr: "Round Robin, RR", priority: "Priority Scheduling" };
  let formattedData = [{algorithm: "Best algorithm", averages: toText[bestAlgoName]}]; // this is correct as per frontend requirements
  formattedData.push(formatData("fcfs", fcfsData), formatData("sjf", sjfData), formatData("rr", rrData), formatData("priority", priorityData));
  return formattedData;
}

module.exports = { compareScheduleAlgoHelper };
