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
  User.findById(req.session.currentUser._id, (err, foundUser)=>{
    Portfolio.findByIdAndRemove(req.params.id, (err, data) =>{
      foundUser.projects.id(req.params.id).remove();
      foundUser.save((err,data)=>{
        req.session.currentUser = data
        res.redirect('/portfolio')
      })
    })
  })
})

//POST
router.post('/', (req,res)=> {
  User.findById(req.session.currentUser._id, (err, foundUser)=>{
    console.log('PLACEMARKER')
    console.log(foundUser)
    Portfolio.create(req.body, (error, createdPortfolio) => {
      foundUser.projects.push(createdPortfolio)
      foundUser.save((err,data)=>{
        console.log(data)
        console.log('wow')
        console.log(foundUser)
        req.session.currentUser = data
        res.redirect('/portfolio')
      })
    })
  })
})


//INDEX ROUTE
router.get('/', (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id, (err, foundUser)=>{
      Portfolio.find({}, (error, allProjects) => {
        res.render('index.ejs', {
          projectList: allProjects,
          currentUser: req.session.currentUser
        })
      })
    })
  } else {
    res.redirect('/sessions/new')
  }
});

//CREATE
router.get('/new', (req,res) => {
  User.find({}, (err, allUsers)=>{
            res.render('new.ejs', {
   currentUser: req.session.currentUser
  })
 })
})


//PUT
router.put('/:id', (req,res)=>{
  User.findById(req.session.currentUser._id, (err, foundUser)=>{
    Portfolio.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel)=>{
      res.redirect('/portfolio/'+req.params.id)
    })
  })
})

//SHOW
router.get('/:id', (req,res) => {
  User.findById(req.params.id, (err, founduser)=>{
    Portfolio.findById(req.params.id, (err, foundProjects) => {
      res.render('show.ejs', {
        project: foundProjects,
        currentUser: req.session.currentUser
      })
    })
  })
})

//Edit
router.get('/:id/edit', (req,res) =>{
  User.findById(req.session.currentUser._id, (err, foundUser)=>{
    Portfolio.findById(req.params.id, (err, foundProject) => {
      console.log(req.session.currentUser.projects)
      res.render('edit.ejs', {
        project: foundProject,
        currentUser: req.session.currentUser
      })
    })
  })
})


module.exports = router;
