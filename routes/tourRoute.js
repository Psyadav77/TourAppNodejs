const express=require('express');
const tourController=require('./../controller/tourController')
const fs=require('fs');
const app=express();
const authController=require('../controller/authController');

const router=express.Router();
//per-fill the filed thats why we use middleware
router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);//http://localhost:8000/api/v1/tours/top-5-cheap

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
 //create Tour Routes
 router.route('/')
 .get(authController.protect, tourController.getAllTours)
 .post(tourController.createTour);

 router.route('/:id')
 .get(tourController.getTour) 
 .patch(tourController.updateTour)
.delete(authController.protect,authController.restrictTo('admin','lead-guid'),tourController.deleteTour);

// app.get('/api/v1/tours/',);
// app.get('/api/v1/tours/:id',);
// app.post('/api/v1/tours/',);
// app.patch('/api/v1/tours/:id',);
// app.delete('/api/tours/:id',);


module.exports=router;
