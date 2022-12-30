const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var datetime = new Date()
var Year = datetime.getFullYear();
var Month = datetime.getMonth()+1;
var Day = datetime.getDate();
var saveTime = Year +"-"+Month+"-"+Day;

const slotSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    slotDate: {
      type: String,
      require: true 
    },
  slotTime: { 
    type: String, 
    require: true 
  },
  bookingDate:{
    type:String,
    default:saveTime
  }
})

const slotModel = mongoose.model('appoint', slotSchema);

module.exports = slotModel;