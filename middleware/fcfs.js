const CalculateGanttChart = (processes) => {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let ganttChart = [];

  for (let i = 0; i < processes.length; i++) {
    const process = processes[i];

    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }


    let startTime = currentTime;
    let endTime = startTime + process.burstTime;


    ganttChart.push({
      processId: process.id,
      startTime: startTime,
      endTime: endTime,
    });


    currentTime = endTime;
  }

  return ganttChart;
}

module.exports = { CalculateGanttChart };