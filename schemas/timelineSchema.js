import joi from "joi";

export const publishPostSchema = joi.object({
  userId: joi.number().required(),
  link: joi.string().uri().required(),
  description: joi.string().allow(null, '')
});

