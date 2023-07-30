const express=require('express');
const fs=require('fs');
const app=express();
const tourRouter=require('./routes/tourRoute');
const userRouter=require('./routes/userRoute');
    //middleware for showing Json data on traminal 
    app.use(express.json());
    //middleware 2--
    app.use((req,res,next)=>{
    //    console.log('Hello From middleware');
        next();
    });
    //middleware 3----
    app.use((req,res,next)=>{
        req.requestTime=new Date().toISOString();
        console.log(req.headers);
        
        next();
    });
    //handling routes using middleware
    app.use('/api/v1/tours',tourRouter)
    app.use('/api/v1/users',userRouter);

    app.all('*',(req,res,next)=>{
        // res.status(404).json({
        //     status:'Fail',
        //     message:`cant't find ${req.originalUrl} on this server!`
        // });
        const err=new Error(`can't find ${req.originalUrl} on the server!`);
        err.status='fail';
        err.satusCode=404;
        next(err);
    });
    //error handle middelware
    app.use((err,req,res,next)=>
    {
        console.log(err.stack);
        err.satusCode=err.satusCode||500;
        err.status=err.status||'error'
        res.status(err.satusCode).json({
            status:err.status,
            message:err.message
        });
    });


//  const port=8081;
//  app.listen(port,()=>{console.log(`App Running On ${port}`)
//  });
    module.exports=app;