import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/User.route.js'
import CategoryRoute from './routes/Category.route.js'
dotenv.config()

const Port = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:process.env.FRONT_END_URL,
    credentials: true
}))

//route setup

app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);

mongoose.connect(process.env.MONGO_DB_KEY,{DbName:'ha-inventory'}).then(()=>{
    console.log('DataBase connected')
}).catch((err)=>{
    console.log('Database connextion failed',err)
})

app.listen(Port, ()=> {
    console.log("App is running on the port: ",Port)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})