import User from "../models/user.model.js"
import bcrypt from "bcrypt"

//register
export const register = async (req, res) => {

    try {
        console.log("Called")
        const { email, password, name, gender } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User Already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ email, name, gender, password: hashPassword });
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login
export const login = async (req, res) => {
    try {
        console.log("Called")
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not exists" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password not matched" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get All Users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get Single User

export const getSingleUSer = async (req, res) => {
    try {
        const { id } = req.params;

        const singleUser = await User.findById(id)
        if (!singleUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteSingleUser = async (req, res) => {

    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "USer Not Found" })
        }
        res.status(200).json({ message: "Successfully Deleted USer" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
