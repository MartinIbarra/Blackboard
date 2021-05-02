const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const maxAge = 5 * 24 * 60 * 60

const createJWT = id => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
}

const alertError = err => {
    let errors = { name:'', email: '', password: '' }
    if(err.message == 'incorrect email'){
        errors.email = 'this email not found'
    }
    if(err.message == 'incorrect password'){
        errors.password = 'the password is incorrect'
    }
    if(err.code === 11000){
        errors.email = 'This email already registered'
        return errors
    }

    if(err.message.includes('user validation failed')){

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })

    }
    return errors
}

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    try{
        const user = await User.create({ name, email, password })
        const token = createJWT(user._id)
        res.cookie('jwt', token,{ httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user })
    } catch(err){
        let errors = alertError(err)
        res.status(400).send({ errors })
    }
}
module.exports.login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)
        const token = createJWT(user._id)
        res.cookie('jwt', token,{ httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user })
    } catch(err){
        let errors = alertError(err)
        res.status(400).send({ errors })
    }
}

module.exports.verifyuser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decodedToken) =>{
            // console.log('decoded token', decodedToken)
            if(err){
                console.log(err.message)
                res.send(`error al leer el token: ${err.message}`)
            } else{
                let user = await User.findById(decodedToken.id)
                res.send(JSON.stringify(user))
                next()
            }
        })
    } else {
        res.send('No existe el token')
        next()
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 })
    res.status(200).json({ logout: true })
}