function calculateCompletionTimeAverage(processes) {
  let currentTime = 0;
  return processes.map(process => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    currentTime += process.burstTime;
    return { id: process.id, completionTime: currentTime };
  });
}


function calculateTurnaroundTimeAverage(processes, completionTimes) {
  if (!completionTimes) {
    completionTimes = calculateCompletionTimeAverage(processes);
  }
  return processes.map(process => {
    const completionTime = completionTimes.find(ct => ct.id === process.id).completionTime;
    return { id: process.id, turnaroundTime: completionTime - process.arrivalTime };
  });
}


function calculateWaitingTimeAverage(processes, turnaroundTimes) {
  if (!turnaroundTimes) {
    turnaroundTimes = calculateTurnaroundTimeAverage(processes);
  }
  return processes.map(process => {
    const turnaroundTime = turnaroundTimes.find(tt => tt.id === process.id).turnaroundTime;
    return { id: process.id, waitingTime: turnaroundTime - process.burstTime };
  });
}


function calculateResponseTimeAverage(processes) {
  let currentTime = 0;
  return processes.map(process => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    const responseTime = currentTime - process.arrivalTime;
    currentTime += process.burstTime;
    return { id: process.id, responseTime: responseTime };
  });
}


function calculateAverages(processes, completionTimes, turnaroundTimes, waitingTimes, responseTimes) {
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


function calculateAllAverages(processes) {

  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  const completionTimes = calculateCompletionTimeAverage(processes);
  const turnaroundTimes = calculateTurnaroundTimeAverage(processes, completionTimes);
  const waitingTimes = calculateWaitingTimeAverage(processes, turnaroundTimes);
  const responseTimes = calculateResponseTimeAverage(processes);


  const averages = calculateAverages(processes, completionTimes, turnaroundTimes, waitingTimes, responseTimes);

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
  calculateCompletionTimeAverage, calculateTurnaroundTimeAverage, calculateWaitingTimeAverage, calculateResponseTimeAverage, calculateAllAverages
};
