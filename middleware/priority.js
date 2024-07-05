const CalculateGanttChart = (processes) => {

  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let ganttChart = [];
  let queue = [...processes];

  while (queue.length > 0) {

    let highestPriorityIndex = -1;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].arrivalTime <= currentTime) {
        if (highestPriorityIndex === -1 || queue[i].priority < queue[highestPriorityIndex].priority) {
          highestPriorityIndex = i;
        }
      } else {
        break;
      }
    }


    if (highestPriorityIndex === -1) {
      currentTime = queue[0].arrivalTime;
      continue;
    }


    let process = queue.splice(highestPriorityIndex, 1)[0];


    if (process.arrivalTime > currentTime) {
      currentTime = process.arrivalTime;
    }


    ganttChart.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + process.burstTime,
    });


    currentTime += process.burstTime;
  }

  return ganttChart;
}


function CalculateGanttChartPreemptive(processes) {

  class PriorityQueue {
    constructor() {
      this.queue = [];
    }

    enqueue(item, priority) {
      const newNode = { item, priority };
      let added = false;

      for (let i = 0; i < this.queue.length; i++) {
        if (priority > this.queue[i].priority) {
          this.queue.splice(i, 0, newNode);
          added = true;
          break;
        }
      }

      if (!added) {
        this.queue.push(newNode);
      }
    }

    dequeue() {
      if (this.queue.length === 0) {
        return null;
      }
      return this.queue.shift().item;
    }
  }

  if (!Array.isArray(processes) || processes.length === 0) {
    throw new Error('Invalid processes array: must be an array with objects');
  }

  processes.forEach(process => {
    if (!process.hasOwnProperty('arrivalTime') ||
      !process.hasOwnProperty('burstTime') ||
      !process.hasOwnProperty('priority')) {
      throw new Error('Invalid process object: missing required properties');
    }
  });


  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);


  const queue = new PriorityQueue();
  let currTime = 0;
  const ganttChart = [];


  while (processes.length > 0 || queue.length > 0) {
    while (
      processes.length > 0 &&
      processes[0].arrivalTime <= currTime
    ) {
      queue.enqueue(processes.shift(), processes[0].priority);
    }


    const process = queue.dequeue();

    if (!process) {
      currTime++;
      ganttChart.push({ process: null, time: 1 });
    } else {
      ganttChart.push({ process: process.id, time: process.burstTime });
      currTime += process.burstTime;
    }
  }

  return ganttChart;
}






module.exports = { CalculateGanttChart, CalculateGanttChartPreemptive };
