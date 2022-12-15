const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json())
//const User= require('./models/userSchema');
const PORT=process.env.PORT;
app.use(require('./router/auth'));

const middleWare=(req,res,next)=>{
    console.log("hello middelware");
    next();
}


app.get('/',(req,res)=>{
    res.send("Hello Kapil");
});
app.get('/aboutMe',middleWare,(req,res)=>{
    
    res.send("About Me");
});

app.get('/login',(req,res)=>{
    res.send("Login");
});
app.get('/contact',(req,res)=>{
    res.cookie("cookie","kapil");
    res.send("Login");
});

app.get('/signUp',(req,res)=>{
    res.send("Sign Up");
});

app.listen(PORT,()=>{
    console.log("server running on port:"+PORT);
})