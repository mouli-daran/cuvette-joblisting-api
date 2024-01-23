const jwt = require('jsonwebtoken');
const BigPromise = require('../middlewares/bigPromise');
const CustomError = require('../utils/customError');
const User = require('../models/user');

exports.isLoggedIn = BigPromise(async (req , res , next) => {
    let token = req.cookies.token;

    if(!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
    }

    if(!token ) {
        return next (new CustomError ('Invalid Token' , 400))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
})

