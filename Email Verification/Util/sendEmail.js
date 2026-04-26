const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = sendEmail;