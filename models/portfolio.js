const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  projectName: { type: String, required: true},
  date: { type: String, required: true},
  previewImage: { type: String, required: true},
  description: { type: String, required: true},
  githublink: { type: String, required: true},
  displayMyProject: { type: Boolean, default: true}
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio;
