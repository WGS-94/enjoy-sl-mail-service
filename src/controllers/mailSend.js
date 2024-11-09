const { sendEmail } = require("../utils/sendMail");
const { sendEmailToUser } = require("../utils/sendMailToUser");

async function mailSend(req, res) {

    const { name, email, destination } = req.body;

    try {
        const firstName = name.split(" ")[0];

        const data = {
            firstName: firstName,
            nome: name,
            email: email,
            destination: destination
        }

        const response = await sendEmail({
            email: "sturismo49@gmail.com",
            subject: "Enjoy São Leo - Novo Turista",
            template: "novo-turista.ejs",
            data
        });

        const resp = await sendEmailToUser({
            email: email,
            subject: "Enjoy São Leo - Seja Bem-Vindo",
            template: "novo-turista-user.ejs",
            data
        });

        res.status(200).send({ response: response, resp: resp });
        return;

    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = { mailSend };