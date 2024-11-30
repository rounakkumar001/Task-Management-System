import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 

        console.log("Authorization Header:", authHeader);
        console.log("Access Token:", token); 

        if (!token) {
            return res.status(401).json({ error_message: "Unauthorized request." });
        }


        const decodedToken = jwt.verify(token, "TaskManagementSystem"); 

        console.log("decodedToken", decodedToken);
        

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error_message: "Invalid Access Token" });
        }

 
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ error_message: "Invalid Access Token" });
        }

        req.user = user; 
        next(); 
    } catch (error) {
        console.error("JWT verification error:", error); 
        return res.status(401).json({ error_message: "Invalid access token" }); 
    }
}

export { verifyJWT };