var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
//const auth = require('../controllers/auth');



router.get('/', function(req, res, next) {
  let id = req.params.id;
  Cube.deleteOne(id)
    .then((results) => {
      res.redirect('/')
    });
});

module.exports = router;