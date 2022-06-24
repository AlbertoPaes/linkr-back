import joi from "joi";

export const editPostSchema = joi.object({
    description: joi.string().allow(null, '').max(160)
});