const nodemailer=require('nodemailer');
const sendEmail= async options=>{
    //create tronspoter

    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMIAL_PASSWORD
        }
        //activate in gmail less secure app option
    });
    //define the emial options
    const mailOptions={
        from:'Prabhat <prabhat@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    //actulay send the email

  await  transporter.sendMail(mailOptions)
}

module.exports=sendEmail;