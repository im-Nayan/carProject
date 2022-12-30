const jwt = require('jsonwebtoken');

exports.checkAuth = (req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken , 'ADMIN_TOKEN_KEY',(err,data)=>{
            // console.log(data);
            if(!err){
                console.log('Admin token is verified');
                req.cookieData =data
                next();
            }else{
                console.log('Admin token is not verified',err);
                res.redirect('/admin/Admin_Controller')
            }
        })
    }else{
        res.redirect('/admin/Admin_Controller')
    }

}
