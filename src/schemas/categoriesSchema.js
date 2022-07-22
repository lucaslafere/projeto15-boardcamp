import joi from 'joi';

export const categoryPostSchema = joi.object({
    name: joi.string().required()
});