const asyncHandler = require('express-async-handler');
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'})
}

// Register New User
// @route POST /register
// access Public

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;

    //Validation
     if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all field')
     }

     // Check if user exist
     const userExist = await User.findOne({email})
     if(userExist){
        res.status(400)
        throw new Error ('User already exist')
     }

     // Length of password
     if(password.length < 6) {
        res.status(400)
        throw new Error('Password must be up to 6 characters')
     }
     // Hash Password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

     // Create new user
     const user = await User.create({
        name,
        email,
        password : hashedPassword,
     })

     // Generate token
     const token = generateToken(user._id)
     if(user) {
        
       res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires : new Date(Date.now() + 1000 * 86400),
       

        // secure: true,
        // samesite : none,
       })
       res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role : user.role,
        token,
       })


     }else {
        res.status(400);
        throw new Error('Invalid User Data')
     }



})









module.exports = {
    registerUser,
}

