import connection from '../db/database.js';
import { categoryPostSchema } from '../schemas/categoriesSchema.js';

export async function getCategories (req, res) {
    try {
        const { rows: categories } = await connection.query (`SELECT * FROM categories`);
        return res.send(categories);
    } catch (error) {
        return res.status(500).send("Server failed");
    }
}

export async function postCategories (req, res) {
    const body = req.body;
    const { error } = categoryPostSchema.validate(body);
    if (error) return res.sendStatus(400);

    try {
        const checkExistingCategory = await connection.query(`SELECT * FROM categories WHERE name='${body.name}'`);
        if (checkExistingCategory.rowCount > 0)  {
            return res.status(409).send("Essa categoria já existe");
        }
        const createCategory = await connection.query(`INSERT INTO categories (name) VALUES ('${body.name}')`);
        return res.sendStatus(201);      

    } catch (error) {
        return res.status(500).send("Server failed");
    }
}