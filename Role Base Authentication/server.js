const express = require('express');
// require('dotenv').config();

const connectDB = require('./Config/db')
const authRoutes = require("./Routes/authRoutes")
const userRoute = require('./Routes/userRoutes')
const adminRoute = require('./Routes/adminRoutes')
const {errorMiddleware} = require('./Middleware/errorMiddleware')

const app = express();

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use(errorMiddleware)

app.get("/", (req,res) => res.send("API is running..."))

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port 5000`);
        });
    })
    .catch((err) => {
        console.error("DB connection failed", err);
        process.exit(1);
    });