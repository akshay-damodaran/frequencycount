const express = require('express');
const morgan = require('morgan');

const conf = require('./conf.json');
const getCount = require('./models/getCount');

const app = express();

app.use(morgan('dev'));

app.get('/frequency', async (req, res) => {
  const { n } = req.query;
  try {
    const result = await getCount(n);
    res.send({ result });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(conf.port, () => console.log(`Server started on port ${conf.port}!`));