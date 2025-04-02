// // const express = require('express');
// // const cors = require('cors');

// // const app = express();
// // const PORT = 5000;

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // // Sample Route
// // app.get('/', (req, res) => {
// //     res.send('Hello, World!');
// // });

// // // Start Server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./src/Config/db');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoD
// connectDB();

// // Import Routes
// const userRoutes = require('./src/routes/user.route');

// // Use Routes

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
// app.use('/api/users', userRoutes);


// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/db');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("src/upload"));
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
const startServer = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        
        // Import Routes
        const userRoutes = require('./src/routes/user.route');
        const postRoutes = require('./src/routes/post.route');

        // Use Routes
        app.get('/', (req, res) => {
            res.send('Hello, World!');
        });

        app.use('/api/users', userRoutes);
        app.use('/api/posts', postRoutes);
        


        // Start Server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
