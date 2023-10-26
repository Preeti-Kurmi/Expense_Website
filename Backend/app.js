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
 
app.post('/signup',async(req,res)=>{
    console.log(req.body);
    const name=req.body.Name;
    const email=req.body.Email;
    const Password=req.body.Password;
    
    const c ={name,email,Password};
    try{
        const user1= await expenses.findOne({
            where:{email:email}
        });
        if(user1){
            res.status(500).json({error:'User is exit already'});
        }
        else{
    const user= await expenses.create({
        name:name,
        email:email,
        password:Password
    })
    res.status(201).json(user);}}

    catch(error){
        console.log(error);
        res.status(500).send("error");

    }

    

   

})
// app.get('/getlogin',async(req,res)=>{
//     try{
//     const login=expenses.findAll()
//     res.status(201).json(login);}
//     catch(error){
//         console.log(error);
//         res.status(500).send("Error occuring");
//     }

// })
app.post('/login',async(req,res)=>{

    const email=req.body.LEmail;
    const password=req.body.LPassword;
    console.log(email);
    try{
       const user=await expenses.findOne({where:{email:email}})
       if(!user){
        res.status(404).send("Sorry user is not exist ");
       }
       if(password===user.password){
        res.status(200).json(user);
       }
       else{
        res.status(404).send("Incorrect Password");
       }

    }
    catch(error){
        console.log(error);
        res.status(500).send("Sorry Something went wrong while login");

    }
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
    



