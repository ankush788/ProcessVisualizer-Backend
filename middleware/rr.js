const CalculateGanttChart = (processes, timeSlice) => {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let ganttChart = [];
  let queue = [...processes];

  while (queue.length > 0) {
    let process = queue.shift(); 

    if (process.arrivalTime > currentTime) {
      currentTime = process.arrivalTime;
    }

    let slice = Math.min(timeSlice, process.burstTime);

    ganttChart.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + slice,
    });

    process.burstTime -= slice;
    currentTime += slice;
    
    if (process.burstTime > 0) {
      queue.push(process);
    }
  }

  return ganttChart ;
}

module.exports = { CalculateGanttChart };
