import connectDB from "./db/db.js";
import express from 'express'
import cors from 'cors'
import route from './routes/routes.js'
import adminRoutes from './routes/adminRoutes.js'

//delcration
const PORT = process.env.PORT || 5000
const app = express()

//func call
connectDB()

//middle wares
app.use(express.json())
// app.use(cors());
app.use(cors({
  origin: 'https://dkart-client.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/ecommerce', route)
app.use('/admin', adminRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})