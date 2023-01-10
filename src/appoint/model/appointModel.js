const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// var datetime = new Date()
// var Year = datetime.getFullYear();
// var Month = datetime.getMonth()+1;
// var Day = datetime.getDate();
// var saveTime = Year +"-"+Month+"-"+Day;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!   
var yyyy = today.getFullYear();

saveTime = yyyy + '-' + mm + '-' + dd;
console.log(saveTime)

const slotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  slotDate: {
    type: String,
    require: true
  },
  slotTime: {
    type: String,
    require: true
  },
  bookingDate: {
    type: String,
    default: saveTime
  }
})

const slotModel = mongoose.model('appoint', slotSchema);

module.exports = slotModel;