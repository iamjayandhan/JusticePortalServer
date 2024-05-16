// server.js

const express = require('express');
const app = express();
const router = require('./routes/route.js');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = process.env;

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specified methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specified headers
    next();
});
// Handle user signup
const signup = async (req, res) => {
    try {
        let message = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Successfully Register with us.",
            html: "<b>Successfully Register with us.</b>",
        };

        const info = await transporter.sendMail(message);
        return res.status(201).json({
            msg: "You should receive an email",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Routes
app.use('/api/user', router); // Mount the router under '/api/user'

const PORT = process.env.PORT || 8000;

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
