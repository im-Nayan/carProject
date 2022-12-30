const express= require('express');
const Admin_SignUp_SignIn_Controller= require('../controller/Admin_SignUp_SignIn_controller');
const adminSignUpCheck = require('../middileware/adminSignUpCheck')


const Admin_SignUp_SignIn_Route =express.Router();

Admin_SignUp_SignIn_Route.get('/adminSignUp',Admin_SignUp_SignIn_Controller.adminSignUp);

Admin_SignUp_SignIn_Route.get('/Admin_Controller',Admin_SignUp_SignIn_Controller.adminSignIn);
Admin_SignUp_SignIn_Route.get('/logOut',Admin_SignUp_SignIn_Controller.logOut);


// POST METHODS
Admin_SignUp_SignIn_Route.post('/adminSignUp_post',adminSignUpCheck.check,Admin_SignUp_SignIn_Controller.adminSignUp_post)
Admin_SignUp_SignIn_Route.post('/adminSignIn_post',adminSignUpCheck.signInCheck,Admin_SignUp_SignIn_Controller.adminSignIn_post)




module.exports=Admin_SignUp_SignIn_Route;