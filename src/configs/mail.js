const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "012410ab8f0527",
        pass: "e4b9c666500508",
    },
});
