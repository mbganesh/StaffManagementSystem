const mongoose = require('mongoose')

const EmpSchema = new mongoose.Schema({
    EmpId:String,
    EmpName:String,
    EmpMobNo:String,
    EmpEmail:String,
    Empdob:String,
    EmpAddress:String,
    Empbg:String,
    EmpDesignation:String
})

const EmpModel = mongoose.model( 'my_employee' , EmpSchema)

module.exports = EmpModel