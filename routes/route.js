const express = require('express');
const router = express.Router();
const { signup } = require('../controller/appController.js');

// POST request for signup
router.post('/product/getbill', signup); // Ensure the path matches your request

// Additional test route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

module.exports = router;