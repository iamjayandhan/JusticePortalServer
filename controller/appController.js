const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = process.env;

const signup = async (req, res) => {
    try {
        let message = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Successfully Register with us.",
            html: "<b>Successfully Register with us.</b>",
        };

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

module.exports = {
    signup,
};
