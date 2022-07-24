import joi from "joi";

export const gamesPostSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i
    ).required(),
    stockTotal: joi.number().positive().required(),
    categoryId: joi.required(),
    pricePerDay: joi.number().positive().required()
});