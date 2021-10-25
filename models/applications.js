const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  position: { type: String, required: true},
  date: { type: String, required: true},
  companyImage: { type: String, required: true},
  status: { type: String, required: true},
  applicationLink: { type: String, required: true}
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application;
