const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const PORT = 2001;

const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));


// SESSION SECTION
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'SESSION_SECRET_KEY',
  cookie: {
      maxAge: 60 * 60 * 1000
  }
}))
app.use(cookieParser());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', [
  __dirname + '/webservices/signUp_signIn/views',
  __dirname + '/webservices/Ragisters/views',
  __dirname + '/webservices/Booking/views',

])


const appointRoute = require('./src/appoint/router/appointRouter');
app.use(appointRoute)

const slotRoute = require('./src/appoint/router/slotRouter');
app.use(slotRoute)


// FOR ADMIN
// ADMIN SIGN UP AND SIGN IN ROUTER
const Admin_SignUp_SignIn_Route= require('./webservices/signUp_signIn/router/admin_SigIn_SignUp_router');
app.use('/admin',Admin_SignUp_SignIn_Route);

// USER TABLE
const UserTable_Route= require('./webservices/Ragisters/router/userTable_router');
app.use('/admin',UserTable_Route);

// SLOT BOOKING
const booking_Route= require('./webservices/Booking/router/booking_Router');
app.use('/admin',booking_Route);



mongoose.connect('mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/CarGarage', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(connect=>{
    app.listen(PORT,()=>{
        console.log('port no 2001');
        console.log(`http://127.0.0.1:${PORT}/admin/Admin_Controller`);

    })
})
