const express = require('express')
const zod = require("zod")
const User = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = requite("../config")

const userRouter = express.Router()

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


userRouter.post('signup', async (req,res) => {
    const {success} = signupBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const doesUserExist = await User.findOne({
        username: req.body.username
    })

    if(doesUserExist) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    const userId = newUser._id
    const token = jwt.sign({userId}, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin", async (req,res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const foundUser = await user.findOne({
        username: req.body.username,
        pasword: req.body.password
    })

    if(foundUser) {
        const token = jwt.sign({userId: user._id}, JWT_SECRET)
        return res.json({
            token: token
        })
    }

    res.status(411).json({
        message: "Error while loggin in."
    })

})


module.exports = userRouter