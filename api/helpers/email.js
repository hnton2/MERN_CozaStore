const nodemailer = require("nodemailer");

let sendEmail = (email, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "hongocton0406@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    var mailOptions = {
        from: "hongocton0406@gmail.com",
        to: email,
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = {
    sendEmail,
};
