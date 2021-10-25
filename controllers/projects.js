const express = require('express')
const router = express.Router();
const Portfolio = require('../models/portfolio.js')
const Application = require('../models/applications.js')
const User = require('../models/users.js')


////////////////////////////////////////
/////////////////APPLICATIONS//////////////
//Application Data POST
router.post('/applications', (req,res)=> { //wha's the use of the scond parameter here?
  Application.create(req.body, (error, createdApplication) => {
    res.redirect('/portfolio/applications')
  })
})

//Application Data Index
router.get('/applications', (req, res) => {
  Application.find({}, (error, allApplications) => {
    res.render('appindex.ejs', {
      applicationList: allApplications,
      currentUser: req.session.currentUser
    })
  })
});

//Applications Create
router.get('/applications/new', (req,res) => {
  res.render('appnew.ejs', {
   currentUser: req.session.currentUser
 })
})

//Applications delete
router.delete('/applications/:id', (req,res) => {
  Application.findByIdAndRemove(req.params.id, (err, data) =>{
    res.redirect('/portfolio/applications')
  })
})

//Applications Show
router.get('/applications/:id', (req,res) => {
  Application.findById(req.params.id, (err, foundApplications) => {
    res.render('appshow.ejs', {
      application: foundApplications,
      currentUser: req.session.currentUser
    })
  })
})

//Application Edit
router.get('/applications/:id/edit', (req,res) =>{
  Application.findById(req.params.id, (err, foundApplication) => {
    res.render('appedit.ejs', {
      application: foundApplication,
      currentUser: req.session.currentUser
    })
  })
})

/////////////////////////////////////////////////
//////////////////END OF APPLICATION ROUTES////////
///////////////////////////////////



//___________________
// Routes
//___________________
//localhost:3000

//DELETE
router.delete('/:id', (req,res) => {
  Portfolio.findByIdAndRemove(req.params.id, (err, data) =>{
    res.redirect('/portfolio')
  })
})

//POST
router.post('/', (req,res)=> { //wha's the use of the scond parameter here?
  Portfolio.create(req.body, (error, createdPortfolio) => {
    res.redirect('/portfolio')
  })
})


//INDEX ROUTE
router.get('/', (req, res) => {
  Portfolio.find({}, (error, allProjects) => {
    res.render('index.ejs', {
      projectList: allProjects,
      currentUser: req.session.currentUser
    })
  })
});

//CREATE
router.get('/new', (req,res) => {
  Portfolio.find({}, (err, allUsers)=>{
            res.render('new.ejs', {
   currentUser: req.session.currentUser
  })
 })
})


//PUT
router.put('/:id', (req,res)=>{
  Portfolio.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel)=>{
    res.redirect('/portfolio')
  })
})

//SHOW
router.get('/:id', (req,res) => {
  Portfolio.findById(req.params.id, (err, foundProjects) => {
    res.render('show.ejs', {
      project: foundProjects,
      currentUser: req.session.currentUser
    })
  })
})

//Edit
router.get('/:id/edit', (req,res) =>{
  Portfolio.findById(req.params.id, (err, foundProject) => {
    res.render('edit.ejs', {
      project: foundProject,
      currentUser: req.session.currentUser
    })
  })
})


module.exports = router;
