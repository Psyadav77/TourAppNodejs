const dotenv=require('dotenv');
const mongoose=require('mongoose');
const Tour=require('./../../models/tourModel');
const fs=require('fs');
dotenv.config({path:'./config.env'});
const db=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(db,{
}).then( con =>{
    console.log(con.connections);
    console.log('DB Connection Successfully');
})
//read Json FILE

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tour.json`,'utf-8'));

//Import Data into DATABASE---------------------------------

const importData=async()=>{
    try{
        await Tour.create(tours);
        console.log('Loaded Data Successfully');
    }catch(err)
    {
            console.log(err);
    }
}

//delete Data From Collection

const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('Delete Data Successfully');
    }catch(err)
    {
            console.log(err);
    }
}
if(process.argv[2]==='--import')
{
    importData();
}else if(process.argv[2]==='--delete')
{
    deleteData();
}
console.log(process.argv);