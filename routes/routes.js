import express from 'express'

import { registerUser, loginUser, createOrder, getUserOrders, updateOrderStatus } from '../controller/authController.js'


const route = express.Router()
route.post("/signup", registerUser)
route.post("/login", loginUser)

// Order routes
route.post("/orders", createOrder)
route.get("/orders/:userId", getUserOrders)
route.put("/orders/:userId/:orderId", updateOrderStatus)

export default route;
