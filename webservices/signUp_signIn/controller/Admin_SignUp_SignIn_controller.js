const AdminSignUpModel = require('../model/adminSignUp_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.adminSignUp = (req, res) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, 'ADMIN_TOKEN_KEY', (error, data) => {
            if (!error) {
                res.redirect('/admin/userTable')
            } else {
                const failed = req.flash('failed')
                res.render('register', { failed });


            }
        })
    } else {
        const failed = req.flash('failed')
        res.render('register', { failed });


    }
}


exports.adminSignIn = (req, res) => {

    const success = req.flash('success')
    const failed = req.flash('failed')
    const passchange = req.flash('passchange')
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, 'ADMIN_TOKEN_KEY', (error, data) => {
            if (!error) {
                res.redirect('/admin/userTable')
            } else {
                const failed = req.flash('failed')
                res.render('login', { failed,success,passchange });

            }
        })
    } else {
        const failed = req.flash('failed')
        res.render('login', { failed,success,passchange });

    }
}


// METHOD POST 

// SIGN UP POST
exports.adminSignUp_post = (req, res) => {
    // console.log(req.body);
    new AdminSignUpModel({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Phonnumber: req.body.Phonnumber,
        Password: bcrypt.hashSync(req.body.Password, 10),

    }).save().then(adminSignUP => {
        console.log('Admin Sign Up Successfull');
        res.redirect('/admin/Admin_Controller');
    }).catch(err => {
        console.log('Admin Sign Up Faild', err);
    })
}

// SIGN IN POST
exports.adminSignIn_post = (req, res) => {
    const { Email, Password } = req.body;

    AdminSignUpModel.findOne({ Email }, (err, data) => {
        if (data) {
            if (data.role === 'admin') {
                const hashpass = data.Password
                const compare = bcrypt.compareSync(Password, hashpass);
                if (compare) {
                    const token = jwt.sign({
                        AdminData: data
                    }, 'ADMIN_TOKEN_KEY', { expiresIn: '60m' })
                    res.cookie('adminToken', token);
                    console.log('password compare success');
                    res.redirect('/admin/userTable')
                } else {
                    console.log('Possword Doesn\'t Match');
                    res.redirect('/admin/Admin_Controller')
                }

            }else{
                console.log('Your are Not Admin');
                req.flash('failed','Your are Not Admin')
                res.redirect('/admin/Admin_Controller')
            }
        } else {
            console.log('Email invallid', err);
            res.redirect('/admin/Admin_Controller')
        }
    })
}


// logOut
exports.logOut=(req,res)=>{
    if(req.cookies && req.cookies.adminToken){
        req.flash('success','successfully Log Out')
        res.clearCookie('adminToken')
        res.redirect('/admin/Admin_Controller')
    }else{
        console.log('you are not so smart');
        res.redirect('/admin/Admin_Controller')
    }
}