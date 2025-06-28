import express from 'express'

import { registerUser, loginUser } from '../controller/authController.js'


const route = express.Router()
route.post("/signup", registerUser)
route.post("/login", loginUser)

export default route;
