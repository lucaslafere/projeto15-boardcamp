import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^\d{10,11}$/).required(),
    cpf: joi.string().regex(/^(\d{11})$/).required(),
    birthday: joi.date().required()
});