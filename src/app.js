const express = require('express');

const app = express();
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const routes  = require('./routes/routes');

const corsOptions = {
    origin:'*',
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors(corsOptions));
app.use(express.json());

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes
app.use('/api', routes);

module.exports = app;
