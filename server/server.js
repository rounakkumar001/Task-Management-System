import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";


const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB Connection Failed!!!");
})
