const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Portfolio = require('./portfolio.js')
const Application = require('./applications.js')

const userSchema = Schema({
  username:{ type:String, unique: true, required: true},
  password: String,
  projects: [Portfolio.schema],
  applications: [Application.schema]
})

const User = mongoose.model('User', userSchema)

module.exports = User
