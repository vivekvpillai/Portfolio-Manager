//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Portfolio = require('./models/portfolio.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//DELETE
app.delete('/portfolio/:id', (req,res) => {
  Portfolio.findByIdAndRemove(req.params.id, (err, data) =>{
    res.redirect('/portfolio')
  })
})

//POST
app.post('/portfolio', (req,res)=> { //wha's the use of the scond parameter here?
  Portfolio.create(req.body, (error, createdPortfolio) => {
    res.redirect('/portfolio')
  })
})


//INDEX ROUTE
app.get('/portfolio', (req, res) => {
  Portfolio.find({}, (error, allProjects) => {
    res.render('index.ejs', {
      projectList: allProjects
    })
  })
});

//CREATE
app.get('/portfolio/new', (req,res) => {
  res.render('new.ejs')
})



//PUT
app.put('/portfolio/:id', (req,res)=>{
  Portfolio.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel)=>{
    res.redirect('/portfolio')
  })
})

//SHOW
app.get('/portfolio/:id', (req,res) => {
  Portfolio.findById(req.params.id, (err, foundProjects) => {
    res.render('show.ejs', {
      project: foundProjects
    })
  })
})

//Edit
app.get('/portfolio/:id/edit', (req,res) =>{
  Portfolio.findById(req.params.id, (err, foundProject) => {
    res.render('edit.ejs', {
      project: foundProject
    })
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
