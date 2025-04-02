const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Zeeshan_Ahmad:Zeeshan14@portfoliocluster.jyppd.mongodb.net/Zeeshan', {
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