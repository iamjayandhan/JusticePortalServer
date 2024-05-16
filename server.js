const express = require('express');
const app = express();
const appRoute = require('./routes/route.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Define OPTIONS route for preflight requests
app.options('/api/product/getbill', (req, res) => {
    console.log('Received preflight request for /api/product/getbill');
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.status(200).end();
});

/* routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
