const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name : {type : String, required: true, trim: true},
    age : {type : Number, required: true, trim: true},
    email : {type : String, required:true, trim: true},
    todos : {type : Array, required: true, trim: true}
})

const Todo = mongoose.model('Users', UsersSchema)
module.exports = Users;