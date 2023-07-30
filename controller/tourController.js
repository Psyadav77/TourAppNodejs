const fs=require('fs');
const Tour=require('./../models/tourModel');
const { Console } = require('console');
const { syncBuiltinESMExports } = require('module');
exports.aliasTopTours=(req,res,next)=>{
req.query.limit='5';
req.query.sort='-ratingsAvrage,price';
req.query.fields  ='name,price,ratingsArerage,summary,difficulty';
next(); 
}
// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tour.json`));
    
//create api respone
exports.getAllTours= async(req,res)=>{
    try{
        //BUID QUERY
        const queryObj={...req.query};
        const excludeFields=['page','limit','sort','fields'];
        excludeFields.forEach(el=>delete queryObj[el]);

        console.log(queryObj);
        console.log(req.query);
        console.log(req.requestTime);
        //!ADVANCED FILERTING LIKE LESS THEN AND GREATER THEN HOW TO IMPLEMNET

        let queryStr=JSON.stringify(queryObj);

        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        console.log (JSON.parse (queryStr));
        //EXICUTE THE QUERY 
        //const tours=await Tour.find(req.query);

        let query=Tour.find(JSON.parse(queryStr));

        if(req.query.sort)
        {
            const sortBy=req.query.sort.split(',').join(' ');
            console.log(sortBy);
            //query=query.sort(req.query.sort);
            query=query.sort(sortBy);
        }
        else{
            query=query.sort('-createdAt');
        }

        //3(field Limiting)
        //http://localhost:8000/api/v1/tours?fields=name,duration
        if(req.query.fields)
        {
            const fields=req.query.fields.split(',').join(' ');
            query=query.select(fields);
        }
        else
        {
            query=query.select('-__v');
        }
            //pagination

            const page=req.query.page*1||1;
            const limit=req.query.limit*1||100;
            const skip=(page-1)*limit;

            query=query.skip(skip).limit(limit);

            if(req.query.page)
            {
                const numTour=await Tour.count.countDocuments();
                if(skip>=numTour)
                {
                     throw new Error("This Page does not Have Record");
                }
            }   

        const tours=await query;
        ////const tours=await Tour.find(queryObj)  
        /* this work like this---queryobj
        const query=tour.find().
        where('duration).equals(5).
        where('difficaluty).equals('easy');
        */ 
       
        res.status(200).json({
            status:'Success',
            data:{
                tours
            }
        });
    }catch(err)
    {
        res.status(404).json({
            status:'Fail',
            message:err
        })
    }
}

exports.getTour= async(req,res,next)=>{
    try{
        const tour=await Tour.findById(req.params.id);
        if(!tour)
        {
            return next(new Error('No Tour Found with that id',404));
        }
        res.status(200).json({
            status:'Success',
            data:{
                tour
            }
        });
    }
    catch(err)
    {
        res.status(404).json({
        status:'Fail',
        message:err
        });
    }
   // const id=req.params.id*1;
    // const tour=tours.find(el=>el.id===id);
    // if(!tour){
    //     return res.status(404).json({
    //         status:'Fail',
    //         message:'Invalid Id'
    //     });
    // }

    // res.status(200).json({
    //     status:'Sussess',
    //     data:{
    //         tour
    //     }
    // });
}
exports.createTour= async(req,res)=>{
    //console.log(req.body);
    // res.send('Done');
   try{
    const newTour= await Tour.create(req.body);
    res.status(201).json({
        status:'Success',
              data:{
                tours:newTour
              }
              })
    
// const newId=tours[tours.length-1].id+1;
// const newTour=Object.assign({id:newId},req.body);

// tours.push(newTour);
// fs.writeFile(`${__dirname}/dev-data/data/tour.json`,JSON.stringify(tours),
// err => {
//     res.status(201).json({
//         status:'Success',
//         data:{
//             tours:newTour
//         }
//     });
// });
            }
            catch(err)
            {
                    res.status(400).json({
                        status:'Fail Data',
                        message:err
                    })
            }
}

exports.updateTour=async (req,res,next)=>{
    try{
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!tour)
        {
            return next(new Error('No Tour Found with that id',404));
        }
        res.status(200).json({
            status:'Success',
            data:{
                tour
            }
        });
    }
        catch(err)
        {
            res.status(400).json({
            status:'Fail Data',
            message:err
        })
    }
   
}

exports.deleteTour= async(req,res,next )=>
{
    try{
      const tour=  await Tour.findByIdAndDelete(req.params.id);
      if(!tour)
      {
          return next(new Error('No Tour Found with that id',404));
      }
        return res.status(204).json({
        status:'Success',
        data:'null'
        });
    }
    catch(err){
    res.status(404).json({
        status:'Fail',
        data:null
    });
}
};

exports.getTourStats= async (req,res)=>{
    try{
        const stats = await Tour.aggregate([
            {
            $match:{ratingsAvrage:{$gte:4.5}}
            },
            {
                $group:
                {
                    _id:'$difficulty',//this will group by difficulty lever
                    numTour:{$sum:1},
                    avgRating:{$avg:'$ratingsAvrage'},
                    avgPrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'}
                }
            }
]);
res.status(200).json({
    status:'Success',
    data:{
        stats
    }
})
    }
    catch(err){
            res.status(404).json({
                status:'fail',
                message:err
            })
    }
};

exports.getMonthlyPlan=async (req,res)=>{
    try{
            const year=req.params.year*1;
            const plan=await Tour.aggregate([
                 {
                    $unwind:'$startDates'
                 },
                 {
                 $match:
                 {
                    startDates:
                    {
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                 }
                },
                {
                $group:{
                    _id:{$month:`$startDates`},
                    numTourStarts:{$sum:1},
                    tours:{$push:'$name'}
                }
                },
                {
                    $project:{
                        _id:0
                    }
                }
            ]);
            res.status(200).json({
                status:'success',
                data:{
                    plan
                }
            })
    }
    catch(err)
    {
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}