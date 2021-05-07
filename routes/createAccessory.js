var express = require('express');
var router = express.Router();
const cubes = require('../config/database.json');
const cubesPath = './config/database.json';
const accessories = require('../config/database.json');
const accessoriessPath = './config/database.json';
const fs = require('fs');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const {handlebars} = require('hbs');


/* GET Create Accessory page. */
router.get('/', function(req, res, next) {
  res.render('createAccessory', { title: 'Create Accessory'});
});

router.post('/', function(req, res, next) {

//this must be the same as accessory.js model

    const newAccessory = new Accessory({   
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    });
    
    newAccessory.save()
    .then((result) => {
      console.log(result)
      res.redirect('/')
      })
      .catch((err) => {
        res.send(err)
      })

});


module.exports = router;