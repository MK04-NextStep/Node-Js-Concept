const express = require('express');
require('dotenv').config()
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const {errorMiddleware} = require('./Middleware/errorMiddleware')
const loggerMiddleware = require('./Middleware/loggerMIddleware')
const logger = require('./Util/logger')

const app = express();

app.use(loggerMiddleware)
app.use(express.json())
app.use('/api/auth', authRoutes);

app.use(errorMiddleware)

connectDB()
.then(() => app.listen(process.env.PORT, () => {
    console.log("Database Connected\nSever is listening")
    logger.info("Database Connected");
    logger.info("Server is Listening")
}))
.catch((err) => {
    console.log("Database not connected");
    logger.error("Database not connected", {error: err.message})
})

