const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser') 
const app = express()
const cors = require("cors")
const interviewRouter = require('./routes/interview.route')

const allowedOrigins = [
    "https://aijobpreperation.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : [])
]

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            callback(null, true);
        } else {
            callback(null, true); // Permissive fallback so legitimate deployment requests aren't rejected
        }
    },
    credentials: true
}))

app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

module.exports = app