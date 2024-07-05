function calculateAllAveragesRR(processes, timeQuantum) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let waitingQueue = [];
  let responseTimes = Array(n).fill(-1);

  processes.forEach(process => {
    process.remainingTime = process.burstTime;
  });

  while (completed < n) {
    let foundProcess = false;

    for (let i = 0; i < n; i++) {
      if (processes[i].arrivalTime <= time && processes[i].remainingTime > 0) {
        if (responseTimes[i] === -1) {
          responseTimes[i] = time - processes[i].arrivalTime;
        }

        foundProcess = true;
        if (processes[i].remainingTime > timeQuantum) {
          time += timeQuantum;
          processes[i].remainingTime -= timeQuantum;
        } else {
          time += processes[i].remainingTime;
          processes[i].completionTime = time;
          processes[i].turnaroundTime = time - processes[i].arrivalTime;
          processes[i].waitingTime = processes[i].turnaroundTime - processes[i].burstTime;
          processes[i].responseTime = responseTimes[i];
          processes[i].remainingTime = 0;
          completed++;
        }
      }
    }

    if (!foundProcess) {
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


module.exports = { calculateAllAveragesRR }