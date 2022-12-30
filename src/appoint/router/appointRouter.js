const express = require('express');
const appointController = require('../controller/appointController');
const middlewareController = require('../middileware/middleware');

const appointRoute = express.Router();

// POST METHODS 
appointRoute.post('/appoint_post',middlewareController.middleware,appointController.appoint_post);

module.exports= appointRoute