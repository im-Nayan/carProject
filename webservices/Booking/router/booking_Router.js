const express =require('express');
const booking_controller = require('../controller/booking_Controller');
const admiAuth = require('../../Ragisters/middileware/adminAuth')
const middlewareController = require('../../../src/appoint/middileware/middleware');

const booking_Route = express.Router();

booking_Route.get('/slotBooking',admiAuth.checkAuth,booking_controller.slotBooking)
booking_Route.post('/slotBooking_post',admiAuth.checkAuth,middlewareController.middleware,booking_controller.slotBooking_post)

module.exports = booking_Route;