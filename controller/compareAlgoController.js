const { json } = require("express");
const { compareScheduleAlgoHelper} = require("../middleware/compareAlgo");

exports.compareScheduleAlgo = async(req , res) =>{
  if (!req.body) {
    res.status(404).json("arrivalTimes, burstTimes not found");
  }
  const { processes } = req.body;
  const data = compareScheduleAlgoHelper(processes);
  res.status(200).json({
    sucess: true,
     property: data
  });

}