const schemaValidator = (schema) => {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: true });
    if (validation.error) {
      const error = validation.error.details.map(detail => detail.message);
      return res.status(422).send(error);
    }
    next();
  }
}

export default schemaValidator;