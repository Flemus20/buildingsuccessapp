var express = require('express');
var router = express.Router();
const { body, validationResult} = require('express-validator');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
 // console.log(req.body)
  res.render('register', { title: 'Register for le`Cube' });
});

router.post('/', 
   // username must be 5 characters long
   body('username').isLength( { min: 5 })
   .withMessage('Username must be at least 5 char long...or else.'),
   // password must be at least 5 chars long
   body('password').isLength({ min: 8 })
   .withMessage('Password must be at least 8 chars long'),


  async function (req, res, next) {
 
  if (req.body.password != req.body.repeatPassword) {
    res.send("Passwords don't match")
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = new User(req.body)
    console.log(user)
    await user.save()
    const token = await user.generateAuthToken()
    res.redirect('/');
} catch (error) {
  console.log('le error' ,errors.array())
    res.render('register', { errors: errors.array()})
}

});

module.exports = router;
