require('dotenv').config;

const express=require('express');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());

const PORT =process.env.PORT || 3000;
const transporter = nodemailer.createTransport({
    service: 'outlook',
    port: 587,
    secure:false,
    auth: {
        user: 'keerthanachenna14042005@gmail.com',
        pass: 'Keer.14042005'
    }
});

app.post('/sendEmail',(req,res)=>{
    const { mail, time, subject ,mailBody}=req.body;
    const mailOptions={
        from:'keerthanachenna14042005@gmail.com',
        to:mail,
        time:time,
        subject: subject,
        text: mailBody,
    }
    const sendTime= new Date(time);

const delay=sendTime - Date.now();

if(delay<=0){
    return res.status(400).json({message: 'invalid time'});
}

setTimeout(()=>{
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error('error sending mail',error);
            res.status(500).json({message:'error sending email'});
        }else{
            console.log('email sent:',info.response);
            res.status(200).json({message:'email sent successfully'});
        }
    },delay);
});
})

app.listen(PORT,()=>{
    console.log('server running on',PORT)
})