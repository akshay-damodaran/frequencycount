const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {

    const results = {}
    const messages = {}

    if (schema.query) {
      results.query = Joi.validate(req.query, schema.query);
    }

    if (schema.body) {
      results.body = Joi.validate(req.body, schema.body);

    }
    if (schema.params) {
      results.params = Joi.validate(req.params, schema.params);
    }
    if (schema.headers) {
      results.headers = Joi.validate(req.headers, schema.headers);
    }
    for (let item in results) {
      if (results[item].error) {
        messages[item] = []
        results[item].error.details.forEach((detail) => {
          messages[item].push(detail.message)
        })
      }
    }

    if (Object.keys(messages).length != 0) {
      res.status(400).send({
        messages
      });
    } else {
      next();
    }
  }
}

module.exports = validate;