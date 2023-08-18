const express = require('express');
const morgan= require('morgan'); // for see req details on console
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too many request from this IP, please try again later"
})

app.use(morgan("dev"));
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const isLogedin = (req,res,next)=>{
//     const login =true;
//     if(login){
//         next();
//     }
//     else{
//         res.status(401).send({
//             messege:"please login first",
//         });
//     }
// }

app.get('/test',rateLimiter,(req,res)=>{
    res.status(200).send({
        messege:"api is testing working fine well",
    });

})



app.get('/api/user',(req,res)=>{
    res.status(200).send({
        messege:"user returned!",
    });

})

//client error
app.use((req,res,next)=>{
  
    
    next(createError(404,"page not found"));
})

//server error -> all error handled
app.use((err,req,res,next)=>{
  return res.status(err.status || 500).json({
    success: false,
    messege: err.message,
  })
})


module.exports = app;