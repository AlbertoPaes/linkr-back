import joi from "joi";

export const commentsPostSchema = joi.object({
  comment: joi.string().required().max(160)
});