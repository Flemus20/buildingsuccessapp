var express = require('express');
var router = express.Router();
const cubes = require('../config/database.json');
const cubesPath = './config/database.json';
const fs = require('fs');
const Cube = require('../models/cube');
const {handlebars} = require('hbs');

/* GET Create Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a cube')
  res.render('create', { title: 'Create a Cube '});
});

router.post('/', function(req, res, next) {
  console.log("incoming form submission " , req.body);

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




// router.get('/accessory', function(req, res, next) {
//   console.log('Create accessory');
//   res.render('createAccessory', { title: 'Add Accessory', loggedIn: req.cookies.loggedIn })
// });

// router.post('/accessory', function(req, res, next) {
//   console.log("the accessory form is ", req.body)
//   const newAcc = new Accessory({
//     name: req.body.name,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl
//   });
//   newAcc.save()
//     .then((res) => { console.log('the new accessory is ', res)})
// })
// module.exports = router;
