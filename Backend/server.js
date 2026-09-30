require('dotenv').config()
const connectDB = require('./Database/db')
const app = require('./app')
const express = require('express')
// const generate = require('./Services/ai.service')

const PORT = process.env.PORT

app.listen(PORT, async ()=>{
    await  connectDB()
    console.log(`Server Started at localhost:${PORT}`);
    // generate()
    // generateInterviewReport({ resume, selfDescription, jobDescription})
})