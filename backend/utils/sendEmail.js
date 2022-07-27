const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_EMAIL, // generated ethereal user
            pass: process.env.SMPT_PASSWORD, // generated ethereal password
        },
    });

    const mailOptions = {
        text: options.message,
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
