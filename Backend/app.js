const express=require('express');
const app= express();
const port =80;
const bodyparser=require('body-parser');
const cors=require('cors');
const controller=require('./Controller/controller');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
const mysql=require('./util/database');
const expenses = require('./model/model');
 
app.post('/signup',controller.singup);
app.post('/login',controller.login);
app.post('/add-expense',controller.addexpense)
app.get('/expenses',controller.getaddexpense);
app.delete('/delete/:id',controller.deleteexpense);
mysql.sync({force:false})
.then(res=>{
    console.log(res.data);
    app.listen(port,()=>{
        console.log("Successful");
    })
})
    .catch(err=>{
        console.log(err);
    })
    



