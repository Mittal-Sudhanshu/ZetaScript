const jwt=require('jsonwebtoken');
const UserModel=require('../models/userModel');
const checkLogin=async(req,res,next)=>{
    var token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await UserModel.findById(decoded.id).select('-password');
            next();
        }catch(error){
            res.status(401).json({message: "Unauthorized, token failed"});
        }
    }else{
        res.status(401).json({message: "User not authorized"});
    }
}
module.exports={checkLogin};