const express = require('express')
const router = express.Router();
const Portfolio = require('../models/portfolio.js')

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
  res.render('new.ejs', {
   currentUser: req.session.currentUser
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
