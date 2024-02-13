const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// Generate JWT
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Register New User
// @route POST /register
// access Public

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password, role } = req.body;

   //Validation
   if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all field')
   }

   // Check if user exist
   const userExist = await User.findOne({ email })
   if (userExist) {
      res.status(400)
      throw new Error('User already exist')
   }

   // Length of password
   if (password.length < 6) {
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
      password: hashedPassword,
   })


   if (user) {

      const token = generateToken(user._id)

      res.cookie('token', token, {
         path: '/',
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400),
         // secure: true,
         // samesite : none,
      })
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         role: user.role,

      })

   } else {
      res.status(400);
      throw new Error('Invalid User Data')
   }
})
// Login  User
// @route Post /api/users/login
// access Public

const loginUser = asyncHandler(async (req, res) => {

   const { email, password } = req.body
   // Existing user
   const user = await User.findOne({ email })

   if (!user) {
      res.status(400)
      throw new Error('User does not exist.')
   }

   if (user && (await bcrypt.compare(password, user.password))) {

      const token = generateToken(user._id)
      const newUser = await User.findOne({ email }).select('-password')

      res.cookie('token', token, {
         path: '/',
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400),
         // secure: true,
         // samesite : none,
      })
      res.status(201).json(newUser)
   } else {
      res.status(400)
      throw new Error('Invalid Credentials')
   }
})

// @Logout  User
//  @route Post /api/users/logout
//  @access Public

const logout = asyncHandler(async (req, res) => {
   res.cookie('token', '', {

      path: '/',
      httpOnly: true,
      expires: new Date(0),
      // secure: true,
      // samesite : none,
   })
   res.status(200).json({ message: 'User Succefully logged out' })
})

// @ Desc Get user
// @ Route Get /api/users/getuser
//@ acess Public

const getUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if (user) {
      res.status(200).json(user)
   } else {
      res.status(400)
      throw new Error('No data')
   }

})
// @ Desc Get login status
// @ Route Get /api/users/
//@ acess Public

const getloginStatus = asyncHandler(async (req, res) => {
   const token = req.cookies.token

   if (!token) {
      return res.json(false)
      

   }
   // Verify token
   const verified = jwt.verify(token, process.env.JWT_SECRET);



   if (verified) {
      res.json(true)

   } else {
      res.json(false)
   }
})
// @ Desc Get update user
// @ Route Get /api/users/
//@ acess Public

const updateUser = asyncHandler(async (req, res)  => {
   const user = await User.findById(req.user._id)

   if(user) {

      const {name, phone, address } = user;
      user.name = req.body.name || name ,
      user.phone = req.body.phone || phone,
      user.address = req.body.address || address

      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
   } else {
      res.status(400)
      throw new Error('User Not Found')
   }
})
const updatePhoto = asyncHandler(async (req, res)  => {
          const { photo } = req.body
          const user = await User.findById(req.user._id)
          if(user){
            user.photo = photo
            const updatedUser = await user.save()
            res.status(200).json(updatedUser)

          }else {
            res.status(400)
            throw new Error('User Photo Not Found')
         }

})



module.exports = {
   registerUser, loginUser, logout, getUser, getloginStatus, updateUser, updatePhoto 
}

