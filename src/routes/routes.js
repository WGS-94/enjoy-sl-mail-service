const { Router  } = require('express');
const { mailSend } = require('../controllers/mailSend');

const routes = new Router();

// Routes
routes.post('/send-mail',  mailSend);

module.exports = routes;
