import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import userRoute from "./src/routes/user/userRoute.js"
import { errorHandler } from "./src/middlewares/common/errorHandler.js";
import mongoDBConnection from "./src/database/database.js";

const app = express();
dotenv.config();

app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({extended : false, limit : "50mb"}));

app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// request rate limit
const limiter = rateLimit({windowMs:5 * 60 * 1000, max : 1000 })
app.use(limiter);

// routes
app.use("/api/v1/user", userRoute);

// routes
app.use("/*", (req, res) => {
    res.status(404).send({
        status : 404,
        message : "Route not found!"
    });
});

// error handler
app.use(errorHandler);

const PORT = process.env.SERVER_PORT | 8080;

app.listen(PORT, (err) => {
    if(err){
        console.log(`Server running failed!`.bgRed.white);
    }else{
        mongoDBConnection();
        console.log(`Server running on ${PORT} PORT!`.bgGreen.white);
    }
});
