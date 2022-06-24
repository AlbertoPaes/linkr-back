import joi from "joi";

export const publishPostSchema = joi.object({
  link: joi.string().uri().required(),
  description: joi.string().allow(null, '').max(160)
});

