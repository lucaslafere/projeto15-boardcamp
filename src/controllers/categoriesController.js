import connection from '../db/database.js';

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
    try {
        
    } catch (error) {
        return res.status(500).send("Server failed");
    }
}