const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        // Check for missing fields
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ mssg: "all fileds are required" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({msg:"user not found"})
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if (comparepassword) {
            const token = jwt.sign({ user : user }, 'secret_key', { expiresIn: '1h' })
            return res.json({ mssg: "user logged in succesfully", user: user, token: token })
        }

    } catch (error) {
        return res.json(error);
    }
}

const allUsers = async (req, res) => {
    
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};

    try {

        const users = await User.find({
            ...keyword,
            _id: { $ne: req.user.user._id } // Exclude the user with the given _id
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getLoggedInUser = async(req ,res)  =>{
    try {
       const loggedInUser = await User.findById({
        _id : req.user.user._id
       }) 
       return res.json(loggedInUser) ;
    } catch (error) {
       return res.json(error) 
    }
}




module.exports = {
    register,
    login,
    allUsers ,
    getLoggedInUser

}