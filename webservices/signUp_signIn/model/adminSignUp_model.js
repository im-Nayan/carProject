const mongoose = require('mongoose');

const Schema = mongoose.Schema

const AdminSignUpSchema = new Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },
    
    Phonnumber: {
        type: Number,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }

})


const AdminSignUpModel = mongoose.model('admin', AdminSignUpSchema);

module.exports = AdminSignUpModel