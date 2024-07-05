const CalculateGanttChart = (processes) => {
  const n = processes.length;
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let ganttChart = [];
  let completedProcesses = 0;
  let visited = Array(n).fill(false);

  while (completedProcesses < n) {
    let shortestProcessIndex = -1;
    let minBurstTime = Infinity;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && processes[i].arrivalTime <= currentTime && processes[i].burstTime < minBurstTime) {
        minBurstTime = processes[i].burstTime;
        shortestProcessIndex = i;
      }
    }

    if (shortestProcessIndex === -1) {
      currentTime = processes[completedProcesses].arrivalTime;
      continue;
    }

    let process = processes[shortestProcessIndex];
    let startTime = currentTime;
    let endTime = startTime + process.burstTime;

    ganttChart.push({
      processId: process.id,
      startTime: startTime,
      endTime: endTime,
    });

    currentTime = endTime;

    visited[shortestProcessIndex] = true;
    completedProcesses++;
  }

  return ganttChart;
}


module.exports = {CalculateGanttChart };
