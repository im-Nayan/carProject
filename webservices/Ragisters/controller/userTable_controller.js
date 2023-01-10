const userModel = require('../../../src/appoint/model/appointModel')
const adminModel = require('../../signUp_signIn/model/adminSignUp_model');

exports.userTable = (req, res) => {

    const success= req.flash('success')

        if (req.cookieData) {
            const AdminSignInData = req.cookieData.AdminData;
            const ID = req.cookieData.AdminData._id;
            // console.log(ID);
            adminModel.findById(ID).then(adminModelData => {
                const loginHolderName = adminModelData
                // console.log(loginHolderName) ;
                // console.log(AdminSignInData);
                userModel.find().then(registerUsers=>{
                    // console.log('registerUsers',registerUsers);
                    res.render('tables', {
                        registerUsers,
                         loginHolderName,
                         success
                    })

                })
            })
        } else {
            res.redirect('/admin/Admin_Controller')
        }
}

exports.todaysWork=(req,res)=>{
    const success= req.flash('success')

        if (req.cookieData) {
            const AdminSignInData = req.cookieData.AdminData;
            const ID = req.cookieData.AdminData._id;
            // console.log(ID);
            adminModel.findById(ID).then(adminModelData => {
                const loginHolderName = adminModelData
                // console.log(loginHolderName) ;
                // console.log(AdminSignInData);
                userModel.find().then(registerUsers=>{
                    console.log('registerUsers',registerUsers);
                    res.render('todaysWork', {
                        registerUsers,
                         loginHolderName,
                         success
                    })

                })
            })
        } else {
            res.redirect('/admin/Admin_Controller')
        }
}

// tomorrowWork
exports.tomorrowWork= (req,res)=>{
    const success= req.flash('success')

        if (req.cookieData) {
            const AdminSignInData = req.cookieData.AdminData;
            const ID = req.cookieData.AdminData._id;
            // console.log(ID);
            adminModel.findById(ID).then(adminModelData => {
                const loginHolderName = adminModelData
                // console.log(loginHolderName) ;
                // console.log(AdminSignInData);
                userModel.find().then(registerUsers=>{
                    // console.log('registerUsers',registerUsers);
                    res.render('tomorrowWork', {
                        registerUsers,
                         loginHolderName,
                         success
                    })

                })
            })
        } else {
            res.redirect('/admin/Admin_Controller')
        }
}

// deleteUserTable
exports.deleteUserTable = (req, res) => {
    if (req.cookieData) {
        const uid = req.params.id;
        userModel.findByIdAndDelete({ _id: uid }).then(deleteUserTable => {
            res.redirect('/admin/userTable')
        })

    } else {
        res.redirect('/admin/Admin_Controller')
    }
}