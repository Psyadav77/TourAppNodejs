const express=require('express');
const fs=require('fs');
const app=express();
const tourRouter=require('./routes/tourRoute');
const userRouter=require('./routes/userRoute');
    //middleware for showing Json data on traminal 
    app.use(express.json());
    //middleware 2--
    app.use((req,res,next)=>{
        console.log('Hello From middleware');
        next();
    });
    //middleware 3----
    app.use((req,res,next)=>{
        req.requestTime=new Date().toISOString();
        next();
    });
    //handling routes using middleware
    app.use('/api/v1/tours',tourRouter)
    app.use('/api/v1/users',userRouter);
    
const port=8081;
app.listen(port,()=>{console.log(`App Running On ${port}`)
});