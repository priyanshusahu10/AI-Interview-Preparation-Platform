const mongoose = require('mongoose');
const MongoConnect = mongoose.connect


const connectDB =  () => {
    try {
         MongoConnect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;