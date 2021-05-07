var express = require('express');
var router = express.Router();
const Cube = require('../models/cube')

/* GET about page. */
router.get('/:id/', (req, res, next) => {
  let id = req.params.id;
  // console.log('edit id is', id);
  Cube.findOne({_id: id})
      .then((results) => {
           res.render('edit', {cube: results, loggedIn: req.cookies.loggedIn});
  });    
});

router.post('/:id', async (req, res) => {    
  let cube;
   try {
      cube = await Cube.findById(req.params.id);
      cube.name = req.body.name, 
      cube.description = req.body.description, 
      cube.imageUrl = req.body.imageUrl, 
      cube.difficulty = req.body.difficultyLevel,
      await cube.save();
      res.redirect(`/`);
  }catch(err) {
      if(err) throw err;
          if (cube == null) {
              res.redirect('/');
          }else {
              res.render('details', { cube: cube, errorMessage: 'Error Editing Cube'});
          }       
  }     
});






module.exports = router;