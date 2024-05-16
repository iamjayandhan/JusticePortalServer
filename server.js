const express = require('express');
const app = express();
const appRoute = require('./routes/route.js');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

/* routes */
app.use('/api', appRoute);

// Define OPTIONS route for preflight requests
app.options('/api/product/getbill', cors()); // Use cors middleware for OPTIONS request

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
