const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: {type: String, unique: true, required: true},
    age: {type: Number, default: 25},
    secret: {type: String, default: 'secret comment'},
    public: {type: String, default: 'public comment'}
})

userSchema.set('timestamps', true)

module.exports = mongoose.model('user', userSchema)
