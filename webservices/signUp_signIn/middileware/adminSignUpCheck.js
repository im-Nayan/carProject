
const adminSignUpModel = require('../model/adminSignUp_model')


exports.check = (req, res, next) => {
    const {Fname,Lname,Email,Phonnumber,Password,Re_password } = req.body;
    // console.log(req.body);
    adminSignUpModel.findOne({ Email }, (err, data) => {
        if (data) {
            // console.log(data);
            if(data.Email==Email && data.Phonnumber==Phonnumber){

                console.log('This Email and Phone Number are Already Exist');
                req.flash('failed','This Email and Phone are Already Exist');
                
                return(res.redirect('/admin/adminSignUp'));
            }else{
                console.log('This Email is Already Exist');
                req.flash('failed','This Email is Already Exist');
                
                return(res.redirect('/admin/adminSignUp'));
            }
        }
    })
    adminSignUpModel.findOne({ Phonnumber }, (err, data) => {
        if (data) {
            if(data.Email==Email && data.Phonnumber==Phonnumber){

                console.log('This Email and Phone Number are Already Exist');
                req.flash('failed','This Email and Phone are Already Exist');
                
                return(res.redirect('/admin/adminSignUp'));
            }else{
                console.log('Phone No is Already Exist');
                req.flash('failed','Phone No is Already Exist');
                
                return(res.redirect('/admin/adminSignUp'));
            }
        }
    })
    
    if (!Fname) {
        console.log("Please Enter First Name");
        req.flash("Please Enter First Name");
        res.redirect('/admin/adminSignUp');
        return;
    }
    if (!Lname) {
        console.log("Please Enter Lname Name");
        req.flash("Please Enter Lname Name");
        res.redirect('/admin/adminSignUp');
        return;

    }
    if (!Email) {
        console.log("Please Enter Email");
        req.flash("Please Enter Email");
        res.redirect('/admin/adminSignUp');
        return;
    }
    if (!Phonnumber) {
        console.log("Please Enter Phonnumber");
        req.flash("Please Enter Phonnumber");
        res.redirect('/admin/adminSignUp');
        return;
    }
    if (!Password) {
        console.log("Please Enter Password");
        req.flash("Please Enter Password");
        res.redirect('/admin/adminSignUp');
        return;
    }
    if (!Re_password) {
        console.log("Please Enter Re_password");
        req.flash("Please Enter Re_password");
        res.redirect('/admin/adminSignUp');
        return;
    }
    if (Password != Re_password) {
        console.log("Password or Confirm Password Doesn\'t Match");
        req.flash("Password or Confirm Password Doesn\'t Match");
        res.redirect('/admin/adminSignUp');
        return;
    }
    next();
}


exports.signInCheck = (req, res, next) => {
    const { Email, Password } = req.body;

    if (!Email) {
        console.log("Please Enter Email");
        req.flash('failed',"Please Enter Email");
        res.redirect('/admin/Admin_Controller');
        return;
    }
    if (!Password) {
        console.log("Please Enter Password");
        req.flash('failed',"Please Enter Password");
        res.redirect('/admin/Admin_Controller');
        return;
    }
    next();
}