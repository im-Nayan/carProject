const express = require('express');
const slotController = require('../controller/slotController');
const middlewareController = require('../middileware/middleware');
const slotRoute = express.Router();

// POST METHODS 
slotRoute.post('/slot_post',slotController.slot_post);

module.exports= slotRoute