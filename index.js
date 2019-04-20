const express = require('express');
const morgan = require('morgan');

const conf = require('./conf.json');

const app = express();

app.use(morgan('dev'));

app.listen(conf.port, () => console.log(`Server started on port ${conf.port}!`));