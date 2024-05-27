const express = require('express');
const cors = require('cors');
const app = express();
const appRoute = require('./routes/route.js');

const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
  origin: '*'
}));

app.use(express.json());

/* routes */
app.use('/api', appRoute);


app.options('/api/product/getbill', (req, res) => {
    // Set CORS headers for preflight request
    res.setHeader('Access-Control-Allow-Origin', 'https://justice-portal.vercel.app'); // Allow requests only from the specified origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the specified methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the specified headers
    res.sendStatus(200); // Respond with OK status
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
