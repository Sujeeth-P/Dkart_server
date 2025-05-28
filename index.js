import connectDB from "./db/db.js";
import express from 'express'
import cors from 'cors'
import route from './routes/routes.js'

//delcration
const PORT = process.env.PORT || 5000
const app = express()

//func call
connectDB()

//middle wares
app.use(express.json())
app.use(cors());
app.use('/ecommerce', route)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})