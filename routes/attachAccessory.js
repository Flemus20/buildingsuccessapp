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
const { removeListener } = require('../models/cube');


/* GET Create Accessory page. */
/* GET details by ID listing. */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')

    .then((results) => {

      var theAccessories;

      Accessory.find({}).then((response) => {
    
        theAccessories = response;

        //Now we have to compare the ID's from the accessories in the cube
        //to the ID's from the accessories that we get from the Accessory.find() method
        //which finds ALL the accessories in the database


        //This finds all the accessories attached to the cube already
        let idArr = results.accessories.map(indObjectinArray => {return indObjectinArray._id;});
        
        //Filters out the accessories we already have
        let filteredAccessories = response
            //if the ID that we find in the collection of accessory objects in our
            //database does not include the ID's that we have in our Array of objects
            //in the cube that we find...
            .filter(indAccessoryinColl => !idArr.includes(indAccessoryinColl._id));

        
        //accessories: filteredAccessories because we want the ones left over after we 
        //find the ones that are not attached to the cube already.
        res.render('attachAccessory', { cube: results, accessories: filteredAccessories })

      });
      
    });

  });



 //These routes are to update the cube 

  router.post('/:id', function(req, res, next) {

  let selAccId = req.body.accessory; 
  
  Accessory.findOneAndUpdate(
    {_id: selAccId},
    {$push: {"cubes": req.params.id}},
    {upsert: true},
    function(err){
       if(err) throw(err);
    }
  ) 
  
    Cube.findOneAndUpdate(
      {_id: req.params.id}, 
      {$push: {"accessories": req.body.accessory}}, 
      function(err){
        if(err) throw(err);
     })

     res.redirect(`/details/${req.params.id}`);
});


  
module.exports = router;