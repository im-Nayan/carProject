const express =require('express');
const userTable_controller = require('../controller/userTable_controller');
const admiAuth = require('../middileware/adminAuth')

const userTable_Route = express.Router();

userTable_Route.get('/userTable',admiAuth.checkAuth,userTable_controller.userTable)
userTable_Route.get('/todaysWork',admiAuth.checkAuth,userTable_controller.todaysWork);
userTable_Route.get('/tomorrowWork',admiAuth.checkAuth,userTable_controller.tomorrowWork);
userTable_Route.get('/deleteUserTable/:id',admiAuth.checkAuth,userTable_controller.deleteUserTable)

module.exports = userTable_Route;