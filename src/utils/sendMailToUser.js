// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

async function sendEmailToUser(options) {
  // Implement the nodemailer logic here to send the reset email
  return new Promise(async (resolve, reject) => {

    let remetente = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // secure: true
    });

    const { email, subject, template, data } = options;

    const templatePath = path.resolve(process.cwd(), 'src', 'mails', template);

    // Render the email template with ejs
    const html = await ejs.renderFile(templatePath, data);

    const emailASerEnviado = {
      from: 'sturismo49@gmail.com',
      to: email,
      subject,
      html,
    };

    console.log(emailASerEnviado)

    remetente.sendMail(emailASerEnviado, function (error) {
      if (error) {
        console.log(`Erro ao enviar e-mail: ${error}`);
        return reject({ message: `An error has occured` });
      } else {
        console.log(`${email} - 'Email sent succesfuly!`);
        return resolve({ message: "Email sent succesfuly" });
      }
    });

  });

}

module.exports = { sendEmailToUser };