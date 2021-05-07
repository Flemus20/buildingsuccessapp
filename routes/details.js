var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');



/* GET details by ID listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      res.render('details', {cube: results})
    });
});

module.exports = router;