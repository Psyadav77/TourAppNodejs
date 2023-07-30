const User=require('../models/userModel');
//Handling All User Request

    exports.getAllUsers=async (req,res,next)=>{
        const Users=await User.find()
        try{
            res.status(200).json({
                status:'Success',
                data:{
                    Users
                }
            });
        }
        catch(err){
        res.status(500).json({
            status:'error',
            message:'THIS GetAll User Route Yet Not Define'
        });
    }
}
    
    exports.getUser=(req,res)=>{
        try{

        }
        catch(err){
        res.status(500).json({
            status:'error',
            message:'This GetUser route is not define yet '
        });
    }
    }

    exports.createUser=(req,res)=>{
        try{

        }
        catch(err){
            res.status(500).json({
            status:'error',
            message:'This Post route is not define Yet'
        });
    }
}

    exports.upDateUser=(req,res)=>{
        try{

        }
        catch(err){
        res.status(500).json({
            status:'error',
            message:'This route is not define Yet'
        });
    }
}
    exports.deleteUser=(req,res)=>{
        try{

        }
        catch(err){
        res.status(500).json({
            status:'error',
            message:'This route is not define Yet'
        });
    }
}