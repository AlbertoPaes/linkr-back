const schemaValidator = (schema) => {
  return (req,res,next) => {
    const validation = schema.validate(req.body, { abortEarly: true });
    if (validation.error) {
      console.log(validation.error.details.map(detail => detail.message));
      res.status(422).send("There was a registration error, please fill in the information correctly!");
      return;
    }
    next();
  }
}

export default schemaValidator;