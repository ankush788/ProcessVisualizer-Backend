function calculateAllAveragesPriority(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let responseTimes = Array(n).fill(-1);

  processes.forEach(process => {
    process.remainingTime = process.burstTime;
  });

  while (completed < n) {
    let highestPriorityIndex = -1;
    let highestPriority = -Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
      if (processes[i].arrivalTime <= time && processes[i].remainingTime > 0 && processes[i].priority > highestPriority) {
        highestPriority = processes[i].priority;
        highestPriorityIndex = i;
      }
    }

    if (highestPriorityIndex !== -1) {
      if (responseTimes[highestPriorityIndex] === -1) {
        responseTimes[highestPriorityIndex] = time - processes[highestPriorityIndex].arrivalTime;
      }

      time += processes[highestPriorityIndex].remainingTime;
      processes[highestPriorityIndex].completionTime = time;
      processes[highestPriorityIndex].turnaroundTime = time - processes[highestPriorityIndex].arrivalTime;
      processes[highestPriorityIndex].waitingTime = processes[highestPriorityIndex].turnaroundTime - processes[highestPriorityIndex].burstTime;
      processes[highestPriorityIndex].responseTime = responseTimes[highestPriorityIndex];
      processes[highestPriorityIndex].remainingTime = 0;
      completed++;
    } else {
      time++;
    }
  }

  const averages = {
    averageCompletionTime: processes.reduce((sum, p) => sum + p.completionTime, 0) / n,
    averageTurnaroundTime: processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / n,
    averageWaitingTime: processes.reduce((sum, p) => sum + p.waitingTime, 0) / n,
    averageResponseTime: processes.reduce((sum, p) => sum + p.responseTime, 0) / n
  };

  processes.forEach(process => {
    process.averages = averages;
  });

  return {
    averages: averages,
    processes: processes.map(p => {
      return {
        id: p.id,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
        completionTime: p.completionTime,
        turnaroundTime: p.turnaroundTime,
        waitingTime: p.waitingTime,
      };
    })
  };
}

module.exports = { calculateAllAveragesPriority };
