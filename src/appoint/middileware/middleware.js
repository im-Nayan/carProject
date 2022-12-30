exports.middleware=(req,res,next)=>{
    const input = req.body;
    console.log( 'req.body' , req.body);

  if (!input.name || !input.phone || !input.slotTime || !input.slotDate) {
    res.status(400).json('missing required fields');
  } else {
    next();
  }
}

// function validateSlot(req, res, next) {
//   const input = req.body;

//   slotModel.findOne({ slotTime: input.slotTime, slotDate: input.slotDate}, (error, data) => {
//     if (error) {
//       res.status(500).json({ 
//         message: 'error validating slot',
//         error: error
//       });
//     } else if (data) {
//       res.status(400).json('slot is not available')
//     } else {
//       next();
//     }
//   })
// }

// module.exports={validateSlot}