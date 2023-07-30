    const express=require('express');
    const userController=require('./../controller/userController')
    const authController=require('./../controller/authController')
    //read file from json file
    const router=express.Router();
    router.post('/signup',authController.signup)
    router.post('/login',authController.login)
    
    router.post('/forgotPassword',authController.forgotPassword)
    router.post('/resetPassword',authController.resetPassword)
  

    //create User Routes
    router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

    router.route('/:id')
    .get(userController.getUser)
    .patch(userController.upDateUser)
    .delete(userController.deleteUser);

   module.exports=router;