const bcrypt = require('bcrypt');
const expenses = require('../model/model');
const addexpenses=require('../model/expensemodel');
const { response } = require('express');
const { where } = require('sequelize');
const singup = async (req, res) => {
    console.log(req.body);
    const name = req.body.Name;
    const email = req.body.Email;
    const Password = req.body.Password;

    const c = { name, email, Password };

    try {
        const user1 = await expenses.findOne({
            where: { email: email }
        });
        if (user1) {
            res.status(500).json({ error: 'User is exit already' });
        }
        else {
            // const user= await expenses.create({
            //     name:name,
            //     email:email,
            //     password:Password
            // })
            // res.status(201).json(user);}}
            const salt = 10;
            bcrypt.hash(Password, salt, async (err, hash) => {

                const user = await expenses.create({
                    name: name,
                    email: email,
                    password: hash
                })


            })
        }
    }

    catch (error) {
        console.log(error);
        res.status(500).send("error");

    }

}
const login = async (req, res) => {

    const email = req.body.LEmail;
    const password = req.body.LPassword;

    try {
        const user = await expenses.findOne({ where: { email: email } })
        console.log(user);
        //console.log(req.body);
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    return res.status(500).json("Something went wrong");
                    

                }
                else if (response == true) {
                    return res.status(201).json(user);
                    

                }
                else {
                    return  res.status(401).json("Password is wrong");
                
                }


            })
        }
        else {
            res.status(401).json("Incorrect Password");
            console.log("inccorect password");


        }




    }

    catch (error) {
        console.log(error);

        res.status(500).send("Sorry Something went wrong while login");


    }
}
const addexpense=async(req,res)=>{
    let amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    try{
    const expense= await addexpenses.create({
        amount:amount,
        description:description,
        category:category
    })
    res.status(201).json(expense);


}
catch(error){
    console.log(error);
    res.status(500).json("error");

}
}
const getaddexpense=async(req,res)=>{
    try{
        const get=await addexpenses.findAll();
        res.status(200).json(get);
    }
    catch(error){
        console.log(error);
        res.status(500).json("error");
    }

}
const deleteexpense=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        await addexpenses.destroy({where:{id:id}});
        res.status(200).json("successsfully dleted");
    }
    catch(error){
        console.log(error);
        res.status(500).json("error");
    }

}
module.exports = { singup, login,addexpense,getaddexpense,deleteexpense};