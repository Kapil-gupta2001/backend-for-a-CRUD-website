const DB=process.env.DATABASE;
const mongoose = require('mongoose');


mongoose.connect(DB).then(()=>{
    console.log("Connection to database succesfull");
}).catch((err)=>{
    console.log("error:" + err)
})