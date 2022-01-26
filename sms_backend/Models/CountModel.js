var mongoose = require('mongoose')

var countSchema =  new mongoose.Schema({
    visit:Number // key : Value
})

var countModel = mongoose.model('fans',countSchema)


module.exports = countModel


