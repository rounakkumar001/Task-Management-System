import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan('combined'));

const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

//router import;
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
//router declaration;
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter)

export {app}