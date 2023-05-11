    const express=require('express');
    const userController=require('./../controller/userController')
    //read file from json file
    const router=express.Router();

    //create User Routes
    router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

    router.route('/:id')
    .get(userController.getUser)
    .patch(userController.upDateUser)
    .delete(userController.deleteUser);

   module.exports=router;