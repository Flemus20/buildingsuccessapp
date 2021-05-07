var express = require('express');
var router = express.Router();
const cubes = require('../config/database.json');
const cubesPath = './config/database.json';
const fs = require('fs');
const Cube = require('../models/cube');
const {handlebars} = require('hbs');
const auth = require('../controllers/auth');
const { body, validationResults } = require('express-validator');

/* GET Create Cube page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Create a Cube ', loggedIn: req.cookies.loggedIn});
});

router.post('/', 

// // username must be 5 characters long
// body('name').isLength( { min: 5 })
// .withMessage('Name must be at least 5 char long.'),
// // password must be at least 5 chars long
// body('description').isLength({ min: 20 })
// .withMessage('Description must be at least 8 chars long.')


async function(req, res, next) {

//this must be the same as cube.js

    const newCube = new Cube({   
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficulty: req.body.difficultyLevel
    });
    
    newCube.save()
    .then((result) => {
      console.log(result)
      res.redirect('/')
      })
      .catch((err) => {
        res.send(err)
      })

});

module.exports = router;




