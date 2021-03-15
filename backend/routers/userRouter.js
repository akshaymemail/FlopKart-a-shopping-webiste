import express from 'express'
import data from '../data.js'
import User from '../models/userModel.js'

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

export default userRouter