
const express=require('express');
const fs=require('fs');
const app=express();

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
    const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tour.json`));
    
    //create api respone
    app.get('/api/v1/tours/',(req,res)=>{
        console.log(req.requestTime);
        res.status(200).json({
            status:'Success',
            data:{
                tours
            }
        });
    });

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
                tour
            }
        });
    });

    app.post('/api/v1/tours/',(req,res)=>{
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
    });

    //create User Routes
    app.route('/api/v1/users').get(getAllUsers).post(createUser);
    app.route('/api/v1/users/:id').get(getUser).patch(upDateUser).delete(deleteUser);

const port=8081;
app.listen(port,()=>{console.log(`App Running On ${port}`)
});