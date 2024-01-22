const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength : [30 , "Name should be under 30 characters"]
    },
    email: {
        type: String,
        required: [true , "Email is required"],
        validate: [validator.isEmail , "Email is Invalid"],
        unique: true
    },
    mobile: {
        type: String,
        reuired: [true , "Mobile number is required"],
        maxLength: [10 , "Mobile number must be Indian type with no country code"]
    },
    password: {
        type: String,
        required: [true , "Please provide a password"],
        minLength: [6, "Password must be atleast 6 characters"],
        select: false
    }
});

// encrypt password before save -hooks
userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password , 10)
});

//validate password
userSchema.methods.isValidatePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword , this.password)
};

//creating and returning jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id} , process.env.JWT_SECRET , 
        {
            expiresIn: process.env.JWT_EXPIRY
        })
}

module.exports = mongoose.model('User' , userSchema);