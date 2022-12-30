const appointModel = require('../../../src/appoint/model/appointModel');
const adminModel = require('../../signUp_signIn/model/adminSignUp_model');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require("dotenv").config();
let EMAIL_API_NAME = process.env.EMAIL_API_NAME;
let EMAIL_API_KEY = process.env.EMAIL_API;
let VERYFIED_EMAIL = process.env.VERYFIED_MAIL;

var defaultClient = SibApiV3Sdk.ApiClient.instance
// # Instantiate the client\
var apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = EMAIL_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sender = {
    email: VERYFIED_EMAIL,
    name: 'Car Garage'
}


exports.slotBooking = (req, res) => {
    if (req.cookieData) {
        const AdminSignInData = req.cookieData.AdminData;
        const ID = req.cookieData.AdminData._id;
        // console.log(ID);
        adminModel.findById(ID).then(adminModelData => {
            const loginHolderName = adminModelData
            // console.log(loginHolderName) ;
            // console.log(AdminSignInData);
            const failed = req.flash('failed')
            res.render('booking', {
                loginHolderName, failed
            })

        })
    } else {
        res.redirect('/admin/Admin_Controller')
    }
}


// slotBooking_post
exports.slotBooking_post = (req, res) => {
    // console.log('BODY :', req.body);
    const { name, phone, slotDate, slotTime } = req.body;

    appointModel.find({ slotDate: slotDate }).then(slotDataResult => {
        // console.log('slotDataResult', slotDataResult);

        // console.log('slotDataResult.length',slotDataResult.length);
        if (slotDataResult.length !== 0) {
            appointModel.find({ slotTime: slotTime }).then(slotTimeResult => {

                var checkedDateData = [];


                for (let checked of slotTimeResult) {
                    // console.log('all Checked',checked);
                    if (checked.slotDate == slotDate) {
                        checkedDateData.push(checked);
                    }
                }

                // console.log('checkedDateData',checkedDateData);

                if (slotTimeResult !== null && checkedDateData.length !== 0) {
                    if (checkedDateData[0].slotDate == slotDate) {
                        // console.log('Slot Time Is Already Full', slotTimeResult);
                        // console.log('slotTimeResult.slotDate', checkedDateData[0].slotDate, '==', slotDate);
                        req.flash('failed', 'Slot Time Is Already Full')
                        res.redirect('/admin/slotBooking')
                        
                    }
                } else {
                    new appointModel({
                        name: req.body.name,
                        phone: req.body.phone,
                        slotDate: req.body.slotDate,
                        slotTime: req.body.slotTime,
                    }).save().then(appointData => {
                        // console.log(appointData);
                        req.flash('success', 'Slot Booked SuccessFully')

                        res.redirect('/admin/userTable')

                        adminModel.find().then(adminData => {
                            // console.log(adminData);
                            for (let x of adminData) {
                                // console.log(x.Email);
                                const receivers = [
                                    {

                                        email: x.Email,

                                    }
                                ]
                                tranEmailApi.sendTransacEmail({
                                    sender,
                                    to: receivers,
                                    subject: 'From Car Garage',
                                    htmlContent: `
                                                    <h2>Mr/Mrs,{{params.role}}</h2>
                                                       <h3>{{params.user}},Booked a Slot</h3>
                                                       <h3>User Deatels :</h3>
                                                       <h4>Name :{{params.user}}</h4>
                                                       <h4>Phone No. :{{params.phone}}</h4>
                                                       <h4>Slot Date :{{params.slotDate}}</h4>
                                                       <h4>Slot Time :{{params.slotTime}}</h4>
                                                    `,
                                    params: {
                                        role: x.Fname,
                                        user: appointData.name,
                                        phone: appointData.phone,
                                        slotDate: appointData.slotDate,
                                        slotTime: appointData.slotTime

                                    }
                                })
                            }

                        })





                    }).catch(err => {
                        console.log('appointDate Error', err);

                    })
                }
            }).catch(err => {
                console.log('slotTimeResult ERROR', err);
            })

        } else {
            new appointModel({
                name: req.body.name,
                phone: req.body.phone,
                slotDate: req.body.slotDate,
                slotTime: req.body.slotTime,
            }).save().then(appointData => {
                // console.log(appointData);
                req.flash('success', 'Slot Booked SuccessFully')

                res.redirect('/admin/userTable')


                // EMAIL PART
                adminModel.find().then(adminData => {
                    // console.log(adminData);
                    for (let x of adminData) {
                        // console.log(x.Email);
                        const receivers = [
                            {

                                email: x.Email,

                            }
                        ]
                        tranEmailApi.sendTransacEmail({
                            sender,
                            to: receivers,
                            subject: 'From Car Garage',
                            htmlContent: `
                                            <h2>Mr/Mrs,{{params.role}}</h2>
                                               <h3>{{params.user}},Booked a Slot</h3>
                                               <h3>User Deatels :</h3>
                                               <h4>Name :{{params.user}}</h4>
                                               <h4>Phone No. :{{params.phone}}</h4>
                                               <h4>Slot Date :{{params.slotDate}}</h4>
                                               <h4>Slot Time :{{params.slotTime}}</h4>
                                            `,
                            params: {
                                role: x.Fname,
                                user: appointData.name,
                                phone: appointData.phone,
                                slotDate: appointData.slotDate,
                                slotTime: appointData.slotTime

                            }
                        })
                    }
                })




            }).catch(err => {
                console.log('appointDate Error', err);

            })
        }
    })


}