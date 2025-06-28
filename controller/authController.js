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

// Add order to user's order history
export const createOrder = async (req, res) => {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    try {
        const user = await SignupCollection.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const newOrder = {
            orderId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'COD',
            status: 'pending',
            orderDate: new Date()
        };

        user.orders.push(newOrder);
        await user.save();

        res.status(201).json({ 
            message: "Order created successfully", 
            orderId,
            order: newOrder 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user's order history
export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const user = await SignupCollection.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ orders: user.orders.reverse() }); // Most recent orders first
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { userId, orderId } = req.params;
    const { status } = req.body;
    
    try {
        const user = await SignupCollection.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = user.orders.find(order => order.orderId === orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await user.save();

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};