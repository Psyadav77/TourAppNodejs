
const express=require('express');
const fs=require('fs');
const app=express();

const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tour.json`));
    
//create api respone
const getAllTours=(req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'Success',
        data:{
            tours
        }
    });
}

const getTour=(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id);
    if(!tour){
        return res.status(404).json({
            status:'Fail',
            message:'Invalid Id'
        });
    }

    res.status(200).json({
        status:'Sussess',
        data:{
            tour
        }
    });
}
const createTour=(req,res)=>{
    //console.log(req.body);
    // res.send('Done');
   
const newId=tours[tours.length-1].id+1;
const newTour=Object.assign({id:newId},req.body);

tours.push(newTour);
fs.writeFile(`${__dirname}/dev-data/data/tour.json`,JSON.stringify(tours),
err => {
    res.status(201).json({
        status:'Success',
        data:{
            tours:newTour
        }
    });
});
}

const updateTour=(req,res)=>{
    res.status(200).json({
        status:'Success',
        data:{
            tours:'<update tour Here....>'
        }
    });
}

const deleteTour=(req,res)=>{
    if(req.param.id*1>tours.length)
    {
        return res.status(404).json({
        status:'Fail',
        message:'Invalid ID'
        });
    }
    res.status(204).json({
        status:'Success',
        data:null
    });
}

const router=express.Router();


 //create Tour Routes
 router.route('/')
 .get(getAllTours)
 .post(createTour);

 router.route('/:id')
 .get(getTour)
 .patch(updateTour)
 .delete(deleteTour);

// app.get('/api/v1/tours/',);
// app.get('/api/v1/tours/:id',);
// app.post('/api/v1/tours/',);
// app.patch('/api/v1/tours/:id',);
// app.delete('/api/tours/:id',);


module.exports=router;
