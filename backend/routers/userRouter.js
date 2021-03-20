import express from 'express'
import data from '../data.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/config.js'

const userRouter = express.Router()

// adding users to the database
userRouter.get('/pussy', (req, res) => {
    User.insertMany(data.users, (err, users) => {
        //check for error
        if (!err) {
            // sending added users
            res.send(users)
        } else {
            res.status(500).send({Error : err.message})
        }
    })
})

userRouter.post('/signin', (req, res) => {
    User.findOne({email : req.body.email}, (err, foundUser) => {
        if(foundUser){
            // user found now check for password
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                // right credentials found
                const {_id, firstName,middleName,lastName, email, isAdmin} = foundUser
                res.send({
                    _id : _id,
                    firstName : firstName,
                    lastName : lastName,
                    middleName:middleName,
                    email : email,
                    isAdmin : isAdmin,
                    tokens : generateToken(foundUser)
                })
            } else {
                // either password or username is wrong
                res.status(401).send({Error : "Either User Or Password Is Incorrect"})
            }
        } else {
            // user not found
            res.status(401).send({Error : "User Not Found"})
        }
    })
})
export default userRouter