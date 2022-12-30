const appointModel = require('../model/appointModel')


exports.slot_post = (req,res)=>{
    // console.log('body slot',req.body);
    const {slotDate} = req.body
    appointModel.find({slotDate:slotDate}).then(selectedDateResult=>{
        // console.log(selectedDateResult);


        var OnlySlotTime = [];
        var slotTimeData ; 

        for(let i=0;i<selectedDateResult.length;i++){
          slotTimeData = selectedDateResult[i].slotTime
          OnlySlotTime.push(slotTimeData)
        }







        if(selectedDateResult.length !==0){
          return res.status(200).json({ 
            status:'success',
            result :OnlySlotTime,
            message: 'Slot Date Found  ',
          });
        }else{
          return res.status(200).json({ 
            status:'success',
            result :selectedDateResult,
            message: 'Slot Date not Found Please Proceed ',
          });
        }
        

        }).catch(err=>{
            console.log('appointDate Error',err);
            return res.status(400).json({ 
                status:'Failed',
                message: 'appointDate Error',
              });
        })

        // checkIfAvailable = async (slot) => {
        //     let snapshot = await ref.orderByChild('slotDate').once('value');
        
        //     let available = true;
        
        //     snapshot.forEach((data) => {
        //       let dataval = data.val();
        //       for (let key in dataval) {
        //         let datapoint = dataval[key];
        //         if (slotTime === datapoint) {
        //           available = false;
        //         }
        //       }
        //     });
        //     return available;
        //   };
    
}