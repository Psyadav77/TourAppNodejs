const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const {promisify}=require('util');
const sendEmail=require('../utils/email');
const signToken=id=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}
  
exports.signup=async(req,res)=>{
    try{
    const newUser=await User.create(req.body);
    
       const token=signToken(newUser._id);
       //jwt.sign({ id:newUser._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
  //  const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        console.log(req.body);
        console.log(token);
    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });
}
catch(err)
{ 
    res.status(400).json({
        status:'Fail Data',
        message:err
    });
}
}

exports.login= async (req,res,next)=>{
    
    const {email,password}=req.body;
    //check email password exist
    if(!email||!password)
    {
       return next(new Error('Please Provide email and Password!',400));
    }
    //check if user exists && password is correct 
    const user=await User.findOne({email}).select('+password');

    const correct= await user.correctPassword(password,user.password);
    if(!user||!correct)
    {
        return next(new Error('Incorrect Email or password',401))
    }

    // if everything is ok send token to client
    const token=signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    });
}

exports.protect=async(req,res,next)=>{
    //get the token chech if its exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token=req.headers.authorization.split(' ')[1];
    }
    console.log(token);
   
    if(!token)
    {
        return next(new Error('You are not log in ! please log in get access'));
    }
     //validate token varification
    
    const decoded=await promisify (jwt.verify)(token,process.env.JWT_SECRET)
    //console.log(decode);
        
    //check user exists 
    const freshuser= await User.findById(decoded.id);
    console.log('Fresh',freshuser);
    if(!freshuser)
    {
        return next(new Error('The user beloging to this user does no longer exist',401));
    }
    //if user chenge password jwt was issued
       if(freshuser.changedPasswordAfter(decoded.iat))
       {
        return next(new Error('USer Recently changed password please login again',401));
       }
//grant access to protected route
       req.user=freshuser;
    next();
}

exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        //roles ['admin','lead-guid']role='uuser'
        if(!roles.includes(req.user.role))
        {
            return next(new Error('You Do not have permission to perform this action',403));
        }
        next();
    };
};

exports.forgotPassword= async(req,res,next)=>{
    //get user based on posted email
    const user=await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new Error('There is no user with eamil address',404));
    }
    //genrate the random token
        
    const resetToken=user.createPasswordResetToken();
    await user.save({validateBeforeSave:false});
    //Send it to user email
}

exports.resetPassword=(req,res,next)=>{

}