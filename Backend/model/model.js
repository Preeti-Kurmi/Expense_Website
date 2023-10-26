const Sequelize=require('sequelize');
const mysql=require('../util/database');
const expenses=mysql.define('expenses',

{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            primaryKey:true,
            },
            password:{
                type:Sequelize.STRING,
                allowNull:false,

            }
    


},

)
module.exports=expenses;