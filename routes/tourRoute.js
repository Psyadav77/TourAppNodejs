const express=require('express');
const tourController=require('./../controller/tourController')
const fs=require('fs');
const app=express();


const router=express.Router();


 //create Tour Routes
 router.route('/')
 .get(tourController.getAllTours)
 .post(tourController.createTour);

 router.route('/:id')
 .get(tourController.getTour)
 .patch(tourController.updateTour)
 .delete(tourController.deleteTour);

// app.get('/api/v1/tours/',);
// app.get('/api/v1/tours/:id',);
// app.post('/api/v1/tours/',);
// app.patch('/api/v1/tours/:id',);
// app.delete('/api/tours/:id',);


module.exports=router;
