const express=require('express');
const fs=require('fs');
const app=express();
    //middleware for showing Json data on traminal 

    app.use(express.json());

    //read file from json file
    const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tour.json`));
    
    //create api respone
    app.get('/api/v1/tours/',(req,res)=>{
        res.status(200).json({
            status:'Success',
            data:{
                tours
            }
        })
    })
    app.get('/api/v1/tours/:id',(req,res)=>{
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
                tours
            }
        })
    })

    app.post('/api/v1/tours/',(req,res)=>{
        // console.log(req.body);
        // res.send('Done');
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tour.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'Success',
            data:{
                tours:newTour
            }
        });
    });

    });
    app.patch('/api/v1/tours/:id',(req,res)=>{
        res.status(200).json({
            status:'Success',
            data:{
                tours:'<update tour Here....>'
            }
        });
    });

    app.delete('/api/tours/:id',(req,res)=>{
        if(req.params.id*1>tours.length)
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
    });

const port=3000;
app.listen(port,()=>{console.log(`App Running On ${port}`)
});