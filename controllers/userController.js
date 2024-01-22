const User = require('../models/user');
const BigPromise = require('../middlewares/bigPromise');
const CustomError = require('../utils/customError');
const cookieToken = require('../utils/cookieToken');

exports.signup = BigPromise(async(req , res , next) => {
    const {name , email , mobile , password} = req.body;

    if(!name || !email || !mobile || !password) {
        return next(new CustomError("A field is missing , please check your input" , 400))
    };

    const user = await User.create({
        name ,
        email , 
        mobile , 
        password
    })
    cookieToken(user , res);
});

exports.login = BigPromise(async (req , res , next) => {

    const {email , password} = req.body;

    if(!email || !password) {
        return next(new CustomError('Please provide email or password' , 401))
    }

    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return next(new CustomError('User is not registered in our DB' , 401))
    }

    const isCorrectPassword = await user.isValidatePassword(password);

    if (!isCorrectPassword) {
        return next (new CustomError('Password is incorrect..Try again',401))
    }
    cookieToken(user , res);
})