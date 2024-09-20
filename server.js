import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongooseConnection from "./mongo.js";
import router from "./Routes/index.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json({ extends:true }));
app.use(bodyParser.urlencoded({ extended:true }));

const corsOrigin = ["http://localhost:5173","http://20.192.28.44","https://smsfoundation.neodeals.in"]

app.use(
    cors({
        origin:corsOrigin,
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);
mongooseConnection();
app.use("/api",router);


app.listen(port, (req, res)=>{
    console.log(`Server is running on port ${port}`);
});
