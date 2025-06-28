import SignupCollection from "../model/model.js";
import jwt from 'jsonwebtoken';//handle json webtoken
import dotenv from 'dotenv'//handle env file

dotenv.config();//load env file

    
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token will expire in 1 hour,
    });
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await SignupCollection.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" })
        
        user = new SignupCollection({name,email,password})
        await user.save()

        res.status(201).json({_id: user._id, name: user.name, email: user.email, token: generateToken(user._id)})
    }
    catch (err) {
        res.status(500).json({ err:err.message })
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await SignupCollection.findOne({ email })
        if (!user) return res.status(400).json({ message: "User does not exist" })

        let userMatch = await user.matchPassword(password)

        if (!userMatch) return res.status(400).json({ message: "Invalid credentials" })


        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
    }
    catch (err) {
        res.status(500).json({ err: err.message })
    }
}