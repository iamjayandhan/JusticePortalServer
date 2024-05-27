const express = require('express');
const cors = require('cors');
const app = express();
const appRoute = require('./routes/route.js');

const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

app.use(express.json());

/* routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
