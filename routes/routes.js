import express from 'express'

import { registerUser, loginUser } from '../controller/authController.js'
import { getProducts, getProduct } from '../controller/productController.js'

const route = express.Router()

// Authentication routes
route.post("/signup", registerUser)
route.post("/login", loginUser)

// Public product routes (no authentication required)
route.get("/products", getProducts)
route.get("/products/:id", getProduct)

export default route;
