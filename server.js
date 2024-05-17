const express = require('express');
const cors = require('cors');
const app = express();
const appRoute = require('./routes/route.js');

const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
    origin: '*', // You can restrict this to specific origins if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

// Define OPTIONS route for preflight requests
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.status(200).end();
});

/* routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`;
    console.log(`Server is running on ${baseUrl}`);
});
