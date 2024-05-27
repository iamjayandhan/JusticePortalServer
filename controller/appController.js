const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const signup = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        let message = {
            from: `"Maddison Foo Koch 👻" <${EMAIL}>`,
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

const getBill = async (req, res) => {
    const { userEmail, mailBody, subject, userName } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

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

    try {
        await transporter.sendMail(message);
            // Set CORS headers
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the specified methods
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the specified headers        res.status(201).json({
            msg: "Email sent successfully"
        });
    } catch (error) {
        console.error("GetBill Error:", error);
        res.status(500).json({ error: "An error occurred while sending the email" });
    }
};

module.exports = {
    signup,
    getBill,
};
