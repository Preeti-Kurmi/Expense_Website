const Sequelize=require('sequelize');
const mysql=require('../util/database');
const addexpenses=mysql.define('addexpense',

{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    },
    amount:{
        type:Sequelize.INTEGER,
        
        },
        description:{
            type:Sequelize.STRING,
            
            
            },
            category:{
                type:Sequelize.STRING,
                

            }
    


},

)
module.exports=addexpenses;