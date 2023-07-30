const app=require('./index');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});

const db=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(db,{
}).then( con =>{
    console.log(con.connections);
    console.log('DB Connection Successfully');
})
        //schema
    
    //creating documnet and testing the mpodel

    // const testTour=new Tour({
    //     name:'The Lucknow Tour',
    //     rating:4.7,
    //     price:10000
    // });

    // testTour.save().then(doc=>{
    //     console.log(doc);
    // }).catch(err=>{
    //     console.log('ERROR',err);
    // });


const port=process.env.PORT||8081;
//onsole.log(app.get('env'));

//console.log(process.env);
app.listen(port,()=>{console.log(`App Running On ${port}`)
});