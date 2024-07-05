const express = require('express');
const compareRouter = express.Router();
const{compareScheduleAlgo} = require( "../controller/compareAlgoController");
compareRouter.route("/compareAlgo").post( compareScheduleAlgo); 
module.exports = compareRouter;
