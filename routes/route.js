const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../controller/appController.js');

const signup = async (req, res) => {
    try {
        const { userEmail, userName, mailBody, subject } = req.body;

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            },
        });

        const mailOptions = {
            from: `"Maddison Foo Koch" <${EMAIL}>`,
            to: userEmail,
            subject: subject,
            text: mailBody.intro + '\n\n' + mailBody.outro
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return res.status(201).json({
            msg: "You should receive an email",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Error sending email. Please try again later." });
    }
};

router.post('/product/getbill', signup);

module.exports = router;
