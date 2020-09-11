const mongoose = require('mongoose')
const Schema = mongoose.Schema
const GGuserSchema= new Schema({
    Profilename: String,
    GoogleID: String,
    thumbnail: String
})
const FBuserSchema= new Schema({
    Profilename: String,
    FacebookID: String,
    thumbnail: String,
    email: String
})
const GGuser = mongoose.model('gguser',GGuserSchema)
const FBuser = mongoose.model('fbuser',FBuserSchema)

module.exports={
    GGuser,
    FBuser
}