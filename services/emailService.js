const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html}) => {

        let transpoter = nodemailer.createTransport({
            host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            secure : false,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        const info  = await transpoter.sendMail({
                from : `inShare <${from}>`,
                to,
                subject,
                text,
                html,
        })


}


module.exports = sendMail;