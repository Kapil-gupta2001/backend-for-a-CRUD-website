const express = require('express');
const router = express.Router();
require('../db/conn');
const User= require('../models/userSchema');
const bcrypt = require('bcryptjs');

//storing dta through promises 
// router.post('/register',(req,res)=>{
//     const {name ,email,phone,work,password,cpassword}=req.body;
//     if(!name||!email||!phone||!work||!password||!cpassword){
//         return res.status(422).send("Please fill all the fields");
//     }

//     User.findOne({email:email,phone:phone})
//         .then(userExists=>{
//             if(userExists)
//                 return res.status(422).send("User already exists")
            
//             const User = new User({name,email,phone,work,password,cpassword});

//             User.save().then(()=>{
//                 return res.status(201).send("User register succesfully")
//             }).catch(err=>res.status(500).send("Failed to register")); 
//         }).catch(err=>res.send(err))
// });

//storing data using async await
router.post('/register',async(req,res)=>{
    const {name ,email,phone,work,password,cpassword}=req.body;
    
        if(!name||!email||!phone||!work||!password||!cpassword){  
            return res.status(422).send("Please fill all the fields");
        }
        if(password===cpassword){
            try{
                const userExist= await User.findOne({email:email}&&{phone:phone});  
                    if(userExist)
                        return res.status(422).send("User already exists");
                       
                const user = new User({name,email,phone,work,password,cpassword});
                await user.save();
                    return res.status(201).send("User register succesfully");
                 
               
            }catch(err){
                console.log(err)
            }
        }
        else
            return res.status(403).send("password does not match");
        
            
    
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(401).send("Inv credentials")
    }

    try{
        const userExist= await User.findOne({email:email});
        if(userExist){
            const isMatch = await bcrypt.compare(password,userExist.password);
            if(!isMatch){
                return res.status(401).send("invalid credentials");
            }else{
                const token=await userExist.generateAuthToken();
                console.log(token);
                    res.cookie("jwtoken",token,{
                        expires:new Date(Date.now()+2589000000),
                    });
                return res.status(200).send("Login succesfull");
                }         
            }   
            else{
                return res.status(401).send("invalid credentials");   
            }

    }catch(err){
        console.log(err)
    }
})



module.exports=router;