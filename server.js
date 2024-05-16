const express = require('express');
const app = express();
const appRoute = require('./routes/route.js');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const cors = require('cors');
const { EMAIL, PASSWORD } = process.env;

// Enable CORS for all routes
app.use(cors());

// Define OPTIONS route for preflight requests
app.options('/api/product/getbill', (req, res) => {
    console.log('Received preflight request for /api/product/getbill');
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).end();
});

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

// Handle sending bills via email
const getBill = (req, res) => {
    const { userEmail, mailBody, subject } = req.body;

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Justice Portal Team",
            link: 'https://justice-portal.vercel.app/',
        }
    });

    let response = {
        body: mailBody,
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: subject || 'Registration Successful!',
        html: mail
    };

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "You should receive an email"
        });
    }).catch(error => {
        console.error("GetBill Error:", error);
        return res.status(500).json({ error: error.message });
    });
};

// Routes
app.post('/api/user/signup', signup);
app.post('/api/product/getbill', getBill);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
