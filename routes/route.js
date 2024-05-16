const router = require('express').Router();

const { signup,getBill } = require('../controller/appController.js')

/* HTTP Request */
router.post('/user/signup',signup)
router.post('/product/getbill',getBill)

// Additional test route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

module.exports = router;
