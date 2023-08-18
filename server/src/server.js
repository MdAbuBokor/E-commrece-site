const express = require('express');
const morgan= require('morgan'); // for see req details on console
const bodyParser = require('body-parser');
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const isLogedin = (req,res,next)=>{
    const login =true;
    if(login){
        next();
    }
    else{
        res.status(401).send({
            messege:"please login first",
        });
    }
}

app.get('/test',(req,res)=>{
    res.status(200).send({
        messege:"api is testing working fine well",
    });

})



app.get('/api/user',isLogedin,(req,res)=>{
    res.status(200).send({
        messege:"user returned!",
    });

})

//client error
app.use((req,res,next)=>{
    res.status(404).json({
        messege:"page not found",
    });
    next();
})

//server error
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        messege:"server error",
    })
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});

