const jwt = require('jsonwebtoken')
const User = require('../models/User')


//Checks the database to see if the user exists
//Authentication middleware (which is just a function) that’s 
//gonna check the token. Decrypt it. And then it will get the 
//id back of the user, showing they’re authorized for that route.

const auth = async(req, res, next) => {
    const token = req.cookies.token;

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.render('login', {
            error
        })
    }

}
module.exports = auth