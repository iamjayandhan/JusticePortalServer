// routes/route.js

const router = require('express').Router();
const { signup } = require('../controller/appController.js');

// HTTP Request
router.post('/signup', signup);

// Additional test route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

module.exports = router;
