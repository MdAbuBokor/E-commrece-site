const express = require('express');
const morgan= require('morgan'); // for see req details on console

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const isLogedin = (req,res,next)=>{
    const login =true;
    if(login){
        console.log("is Loged in");
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



app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});

//3 completed