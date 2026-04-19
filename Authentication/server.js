const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/userRouts');
const { checkError } = require("./MIddleware/errorMiddleware");
const connectDb = require("./Config/db");
require('dotenv').config();
const {apiLimit} = require('./MIddleware/rateLimitMiddleware');
const loggerMiddleware = require("./MIddleware/loggerMiddleware")
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))
app.use("/api", apiLimit);

app.use("/user", userRoutes);
app.use(checkError);

app.get("/", (req,res) => {
    res.send("hello");
})

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at ${process.env.PORT}`)
})