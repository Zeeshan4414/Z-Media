const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGO_DB_PASSWORD}@portfoliocluster.jyppd.mongodb.net/Zeeshan`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
