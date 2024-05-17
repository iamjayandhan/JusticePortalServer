const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const signup = async (req, res) => {
    try {
        /* create reusable transporter object using the default SMTP transport */
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            },
        });

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
        console.error("Signup Error:", error); // Log the specific error
        return res.status(500).json({ error: error.message }); // Return the error message
    }
};

const getBill = (req, res) => {
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

    // Generate email content
    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: subject || 'Registration Successful!',
        html: mail
    };

    transporter.sendMail(message).then(() => {
        // Set CORS headers in the response
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return res.status(201).json({
            msg: "You should receive an email"
        });
    }).catch(error => {
        console.error("GetBill Error:", error); // Log the specific error
        return res.status(500).json({ error: error.message }); // Return the error message
    });
};

module.exports = {
    signup,
    getBill,
};
