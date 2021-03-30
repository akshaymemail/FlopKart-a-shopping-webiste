import express from 'express'
import data from '../data.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {
    generateToken, isAuth
} from '../utils/config.js'

const userRouter = express.Router()

// adding users to the database
userRouter.get('/pussy', (req, res) => {
    User.insertMany(data.users, (err, users) => {
        //check for error
        if (!err) {
            // sending added users
            res.send(users)
        } else {
            res.status(500).send({
                Error: err.message
            })
        }
    })
})

//SIGNIN
userRouter.post('/signin', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, foundUser) => {
        if (foundUser) {
            // user found now check for password
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // right credentials found
                const {_id, firstName, middleName, lastName, email, isAdmin} = foundUser
                res.send({
                    _id: _id,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    email: email,
                    isAdmin: isAdmin,
                    token: generateToken(foundUser)
                })
            } else {
                // either password or username is wrong
                res.status(401).send({
                    message: "Either User Or Password Is Incorrect"
                })
            }
        } else {
            // user not found
            res.status(401).send({
                message: "User Not Found"
            })
        }
    })
})

// REGISTER

userRouter.post('/register', (req, res) => {
    //creating a new user in the database
    new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }).save((err, user) => {
        if(!err){
            const {_id, firstName,lastName, email, isAdmin} = user
            res.send({
                _id: _id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                isAdmin: isAdmin,
                token : generateToken(user)
            })
        } else {
            res.status(401).send({message : err.message})
        }
    })
})

// USER PROFILE
userRouter.get('/:id', isAuth, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(!err){
            // user found
            res.send(foundUser)
        } else {
            // no user found
            res.status(404).send({message : 'User Not Found'})
        }
    })
})

// UPDATE USER PROFILE
userRouter.put('/profile', isAuth, (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if(!err){
            // there is no any error, now check for user
            if(foundUser){
                // user was found, now update the information
                foundUser.firstName = req.body.firstName || foundUser.firstName
                foundUser.lastName = req.body.lastName || foundUser.lastName
                foundUser.email = req.body.email || foundUser.email
                if(req.body.password){
                    foundUser.password = bcrypt.hashSync(req.body.password, 8)
                }
                foundUser.save((err, updatedUser) => {
                    if(!err){
                        res.send({
                            _id : updatedUser._id,
                            firstName : updatedUser.firstName,
                            lastName : updatedUser.lastName,
                            email : updatedUser.email,
                            isAdmin : updatedUser.isAdmin,
                            token : generateToken(updatedUser)
                        })
                    }else {
                        res.status(503).send({message : err.message})
                    }
                })
            } else {
                // user was not found, so send 404 status
                res.status(404).send({message : "User Not Found"})
            }
        } else{
            // there was an error
            res.status(503).send({message : err.message})
        }
    })
})

export default userRouter