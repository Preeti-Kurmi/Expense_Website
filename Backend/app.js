const express=require('express');
const app= express();
const port =80;
const bodyparser=require('body-parser');
const cors=require('cors');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
const mysql=require('./util/database');
const expenses = require('./model/model');
 
app.post('/post',async(req,res)=>{
    console.log(req.body);
    const name=req.body.Name;
    const email=req.body.Email;
    const Password=req.body.Password;
    
    const c ={name,email,Password};
    try{
    const user= await expenses.create({
        name:name,
        email:email,
        password:Password
    })
    res.status(201).json(user);}
    catch(error){
        console.log(error);
        res.status(500).send("error");

    }


    console.log(c);
   

})
mysql.sync()
.then(res=>{
    console.log(res.data);
    app.listen(port,()=>{
        console.log("Successful");
    })
})
    .catch(err=>{
        console.log(err);
    })
    



