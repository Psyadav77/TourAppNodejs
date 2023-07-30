const mongoose=require('mongoose');
const slugify=require('slugify');

const tourShema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour Must Have a Name'],
        unique:true,
        trim:true,
        maxlength:[40,'a tour must have less or equal then 40 charcter'],
        minlength:[10 ,' a tour must greater or eqal then 10 character']
    },
    slug:String,
    duration:{
        type:Number,
        required:[true,'A tour Must Have a Duration']

    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour Must Have a Grooup Size']
    },
    difficulty:{
        type:String,
        required:[true,'A tour Must Have a Difficulty'],
        enum:{values:
            ['easy','medium','difficult'],
        message:'other is not supported'}
    },
    ratingsAvrage:{
        type:Number,
        default:4.5,
        min:[1, 'Rating must be above 1.0'],
        max:[5,'Rating must be below 5.0']

    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'A tour Must Have a Price']
    },
    priceDiscount:{
        type:Number,
        validate:{
            validator:function(val)
            { 
                return val<this.price;
            },
            message:'Discount must be less the regular price'
        }
        
    },
    summary:{
        type:String,
        trim:true,
        required:[true,'A tour Must HAve discription']
    },
    discription:{
        type:String,
        trim:true   
    },
    imageCover:{
        type:String,
        required:[true,'A tour Must HAve cover Image']
    },
    images:[String],//Store Images in Array
    createdAt:{
        type:Date,
        default:Date.now()

    },
    startDates:[Date],//start dates of tour in diffrent dates collection like --feb,march ,april,
    secrateTour:{
        type:Boolean,default:false
    }
    },
    {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

//virtul property
tourShema.virtual('durationWeeks').get(function(){
    return this.duration/7;
});
//Document Middelware runs before .save() and .create()
tourShema.pre('save',function(next){
   // console.log(this);
   this.slug=slugify(this.name,{lower:true});
   next();
}) ;

// tourShema.pre('save',function(next){
//     console.log('will Save Document');
//     next();
// });
// tourShema.post('save',function(doc,next){
//     console.log(doc);
// })

//Query Middleware
tourShema.pre(/^find/,function(next){
    this.find({secrateTour:{$ne:true}})//ne =not equal
    this.start=Date.now();
    next();
});

tourShema.post(/^find/,function(docs,next){
    console.log(`Query Took ${Date.now()-this.start} milisecond`);
   // console.log(docs);
    next();
})
//Aggregation Middelware
tourShema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{secrateTour:{$ne:true}}})
    console.log(this.pipeline);
    next();
});



//model
const Tour=mongoose.model('Tour',tourShema);
module.exports=Tour;

//midlware
//document middelware 
//query middelware
//aggrigate 
//model middelware