const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const SECRET = process.env.SECRET

exports.register = async(req, res)=>{
    try {
        const {username, password, email} = req.body

        const existing = await User.findOne({username})
        if(existing) {
            return res.status(400).json({message: 'Username already exists'})
        }

        const emailExist = await User.findOne({email})
        if(emailExist){
            return res.status(400).json({message: 'email already exists'})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({username, email, password : passwordHash})
        await newUser.save()

        res.status(201).json({message: 'User registered successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user)
            return res.status(401).json({message: "Invalid email or password"})

        const isValid = await user.validatePassword(password)
        if(!isValid)
            return res.status(401).json({message: 'Invalid email or password'})

        const payload = {
           id: user._id
        }

        const token = jwt.sign(payload, SECRET, {expiresIn: '1d'})
        res.json({token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}