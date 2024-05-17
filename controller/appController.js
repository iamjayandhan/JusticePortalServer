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

    // Set CORS headers in the response
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    transporter.sendMail(message).then(() => {
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
