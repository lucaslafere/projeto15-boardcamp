import joi from "joi";

export const gamesPostSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().positive().required(),
    categoryId: joi.required(),
    pricePerDay: joi.number().positive().required()
});