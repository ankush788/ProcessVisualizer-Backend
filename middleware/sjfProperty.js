function calculateCompletionTimeAverageSJF(processes) {
  let currentTime = 0;
  let completedProcesses = [];
  let remainingProcesses = [...processes];

  while (remainingProcesses.length > 0) {
    let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    if (availableProcesses.length === 0) {
      currentTime = remainingProcesses[0].arrivalTime;
      availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    }
    availableProcesses.sort((a, b) => a.burstTime - b.burstTime);

    let nextProcess = availableProcesses[0];
    remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);

    if (currentTime < nextProcess.arrivalTime) {
      currentTime = nextProcess.arrivalTime;
    }
    currentTime += nextProcess.burstTime;
    completedProcesses.push({ id: nextProcess.id, completionTime: currentTime });
  }

  return completedProcesses;
}


function calculateTurnaroundTimeAverageSJF(processes, completionTimes) {
  if (!completionTimes) {
    completionTimes = calculateCompletionTimeAverageSJF(processes);
  }
  return processes.map(process => {
    const completionTime = completionTimes.find(ct => ct.id === process.id).completionTime;
    return { id: process.id, turnaroundTime: completionTime - process.arrivalTime };
  });
}

function calculateWaitingTimeAverageSJF(processes, turnaroundTimes) {
  if (!turnaroundTimes) {
    turnaroundTimes = calculateTurnaroundTimeAverageSJF(processes);
  }
  return processes.map(process => {
    const turnaroundTime = turnaroundTimes.find(tt => tt.id === process.id).turnaroundTime;
    return { id: process.id, waitingTime: turnaroundTime - process.burstTime };
  });
}

function calculateResponseTimeAverageSJF(processes) {
  let currentTime = 0;
  let completedProcesses = [];
  let remainingProcesses = [...processes];
  let responseTimes = [];

  while (remainingProcesses.length > 0) {
    let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    if (availableProcesses.length === 0) {
      currentTime = remainingProcesses[0].arrivalTime;
      availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    }
    availableProcesses.sort((a, b) => a.burstTime - b.burstTime);

    let nextProcess = availableProcesses[0];
    remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);

    let responseTime = currentTime - nextProcess.arrivalTime;
    if (currentTime < nextProcess.arrivalTime) {
      currentTime = nextProcess.arrivalTime;
      responseTime = 0;
    }
    responseTimes.push({ id: nextProcess.id, responseTime: responseTime });

    currentTime += nextProcess.burstTime;
    completedProcesses.push({ id: nextProcess.id, completionTime: currentTime });
  }

  return responseTimes;
}

function calculateAveragesSJF(processes, completionTimes, turnaroundTimes, waitingTimes, responseTimes) {
  const totalProcesses = processes.length;

  const totalCompletionTime = completionTimes.reduce((sum, ct) => sum + ct.completionTime, 0);
  const totalTurnaroundTime = turnaroundTimes.reduce((sum, tt) => sum + tt.turnaroundTime, 0);
  const totalWaitingTime = waitingTimes.reduce((sum, wt) => sum + wt.waitingTime, 0);
  const totalResponseTime = responseTimes.reduce((sum, rt) => sum + rt.responseTime, 0);

  return {
    averageCompletionTime: totalCompletionTime / totalProcesses,
    averageTurnaroundTime: totalTurnaroundTime / totalProcesses,
    averageWaitingTime: totalWaitingTime / totalProcesses,
    averageResponseTime: totalResponseTime / totalProcesses
  };
}

function calculateAllAveragesSJF(processes) {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  const completionTimes = calculateCompletionTimeAverageSJF(processes);
  const turnaroundTimes = calculateTurnaroundTimeAverageSJF(processes, completionTimes);
  const waitingTimes = calculateWaitingTimeAverageSJF(processes, turnaroundTimes);
  const responseTimes = calculateResponseTimeAverageSJF(processes);
  const averages = calculateAveragesSJF(processes, completionTimes, turnaroundTimes, waitingTimes, responseTimes);

  return {
    averages: {
      averageCompletionTime: averages.averageCompletionTime,
      averageTurnaroundTime: averages.averageTurnaroundTime,
      averageWaitingTime: averages.averageWaitingTime,
      averageResponseTime: averages.averageResponseTime
    },
    processes: processes.map(process => {
      const completionTime = completionTimes.find(ct => ct.id === process.id).completionTime;
      const turnaroundTime = turnaroundTimes.find(tt => tt.id === process.id).turnaroundTime;
      const waitingTime = waitingTimes.find(wt => wt.id === process.id).waitingTime;
      const responseTime = responseTimes.find(rt => rt.id === process.id).responseTime;

      return {
        id: process.id,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime: completionTime,
        turnaroundTime: turnaroundTime,
        waitingTime: waitingTime,
      };
    })
  };
}

module.exports = {
  calculateCompletionTimeAverageSJF,
  calculateTurnaroundTimeAverageSJF,
  calculateWaitingTimeAverageSJF,
  calculateResponseTimeAverageSJF,
  calculateAllAveragesSJF
};
