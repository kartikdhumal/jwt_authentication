import { User } from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User Already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({
            id: user._id,
            userName,
            email: email,
        },
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        )
        res.status(200).send({
            success: true,
            message: "Registration Successfull",
            token
        });
    }
    catch (err) {
        console.log("Err : " + err);
        res.status(500).send({
            success: false,
            message: "Registration failed"
        })
    }
}


export const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!(userName || password)) {
        return res.status(500).send({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).send({
                success: false,
                message: "Password is wrong"
            })
        }

        const token = jwt.sign({
            id: user._id,
            userName: user.userName,
            email: user.email
        },
            process.env.SECRET_KEY,
            { expiresIn: '2h' });

        res.status(200).send({
            success: true,
            message: "Login Successfull",
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Login failed"
        })
    }
}