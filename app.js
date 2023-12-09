const express=require('express');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const cron = require('node-cron');
const { promisify } = require('util');
const schedule = require('node-schedule');
const cors = require('cors');

// Enable CORS for all routes




const app=express();
require('dotenv').config();
const PORT =process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

    let transporter = nodemailer.createTransport({
    service:"outlook",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,
    },
    });




  app.post('/sendEmail', (req, res) => {
    const { mail, time, subject, mailBody } = req.body;
  
    // Calculate the time difference between the scheduled time and the current time
    const currentTime =  Math.floor(Date.now()/1000);
    const timeDifference = time - currentTime;
  
    if (timeDifference <= 0) {
        res.status(400).json({ message: 'Scheduled time has passed' });
        console.log('Scheduled time has passed');
        return;
    } else {
      // Schedule sending the email using setTimeout
      setTimeout(() => {
        sendEmail(mail, subject, mailBody, res);
      }, timeDifference*1000);
      res.status(200).json({ message: 'Email scheduled successfully' });
      console.log('Email scheduled successfully');
    }
  });
  
  function sendEmail(mail, subject, mailBody, res) {
    const mailOptions = {
      from: 'keerthanachenna14042005@gmail.com',
      to: mail,
      subject: subject,
      text: mailBody,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('error sending mail', error);
        res.status(500).json({ message: 'error sending email' });
      } else {
        console.log('email sent:', info.response);
        res.status(200).json({ message: 'email sent successfully' });
      }
    });
  }
  
  app.listen(PORT, () => {
    console.log('server running on', PORT);
  });
