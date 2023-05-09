    
const express=require('express');

    //Handling All User Request
    const getAllUsers=(req,res)=>{
        res.status(500).json({
            status:'error',
            message:'THIS GetAll User Route Yet Not Define'
        });
    }
    
    const getUser=(req,res)=>{
        res.status(500).json({
            status:'error',
            message:'This GetUser route is not define yet '
        });
    }

    const createUser=(req,res)=>{
        res.status(500).json({
            status:'error',
            message:'This Post route is not define Yet'
        });
    }

    const upDateUser=(req,res)=>{
        res.status(500).json({
            status:'error',
            message:'This route is not define Yet'
        });
    }
    const deleteUser=(req,res)=>{
        res.status(500).json({
            status:'error',
            message:'This route is not define Yet'
        });
    }

    //read file from json file
    
    const router=express.Router();

    //create User Routes
    router.route('/')
    .get(getAllUsers)
    .post(createUser);

    router.route('/:id')
    .get(getUser)
    .patch(upDateUser)
    .delete(deleteUser);

   module.exports=router;