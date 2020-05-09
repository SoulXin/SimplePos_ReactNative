const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

process.env.SECRET_KEY = 'secret'

exports.register_user = async (req,res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.login_user = async (req,res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

}

exports.auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.SECRET_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

exports.logout = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.logout_all = async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.change_password = async(req,res) => {
    try {
        const {email,password,new_password} = req.body;
        const check_user = await User.findByCredentials(email, password);
        check_user.password = await bcrypt.hash(new_password,8); 

        User.updateOne({ email : check_user.email},{
            $set : {password : check_user.password}
        })
        .then(response => {
            res.status(200).send("Change Password Success")
        })
        .catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.change_name = (req,res) => {
    const {email,name} = req.body;
    User.updateOne({ email : email},{
        $set : {name : name}
    })
    .then(response => {
        res.status(200).send("Change Name Success")
    })
    .catch(error => {
        res.status(400).send(error)
    })
}