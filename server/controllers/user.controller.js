import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSAve: false });
        console.log(accessToken, refreshToken);

        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Unable to generate tokens. Please try again later.");

    }
}

const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;
        console.log("user details : ", req.body);

        if ([username, email, password].some((field) => field?.trim() === "")) {
            res.status(400).json({ error_messsage: "All fields are required" });
        };

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            res.status(409).json({ error_message: "User with email or username already exists" });
        }

        const user = User({
            username,
            email,
            password
        })

        const newUser = await user.save();

        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

        if (!createdUser) {
            res.status(500).json({ error_messsage: "Something went wrong while registering the user" });
        }

        return res.status(201).json(
            {
                message: "User Registered Successfully.",
                data: createdUser
            });

    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

      
        if (!username && !email) {
            return res.status(400).json({ error_message: "Username or Email is required" });
        }

      
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(404).json({ error_message: "User does not exist." });
        }

        // Validate password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error_message: "Invalid user credentials." });
        }

   
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);


        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, 
            path : "/",
            domain: 'localhost'
        };  


        return res.status(200)
            .json({
                message: "User logged in successfully.",
                user: loggedInUser,
                accessToken,
                refreshToken
            });
        // return res.status(200)
        //     .cookie("access", accessToken, options)
        //     .cookie("refresh", refreshToken, options)
        //     .json({
        //         message: "User logged in successfully.",
        //         user: loggedInUser
        //     });

    } catch (error) {
        console.error("Error during login:", error); // Log error for debugging
        return res.status(500).json({ error_message: "An error occurred during login." });
    }
};


const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {

                $unset: {

                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: false
        }

        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out!" });
    }
    catch (error) {
        console.log("Error while logging out : ", error.message);
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}