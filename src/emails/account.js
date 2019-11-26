const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'benkissi111@gmail.com',
        subject: 'Thanks for joining',
        text: `Hi ${name}, welcome to the app. Let me know if you have any issues`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'benkissi111@gmail.com',
        subject: 'Sad to see you leave',
        text: `Hi ${name}, Sad to see you leave. Kindly let me know why you uninstalled`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
