import connection from "../db/database.js";
import { gamesPostSchema } from "../schemas/gamesSchema.js";


export async function getGames (req, res) {
    const nameQuery = req.query.name;
    let query;
    try {
        if (nameQuery !== undefined) {
            const nameLowerCase = nameQuery.toLowerCase();
            query = `
            SELECT games.*, categories.name as "categoryName" FROM games 
            JOIN categories
            ON games."categoryId"=categories.id
            WHERE games.name
            LIKE '${nameLowerCase}%'`;
        }
        else {
            query = `
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories 
            ON games."categoryId"=categories.id`;
        }
        const { rows: games } = await connection.query(query);
        return res.send(games);

    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function postGames (req, res) {
    const body = req.body;
    const { error } = gamesPostSchema.validate(body);
    if (error) return res.sendStatus(400);
    try {
        const checkExistingGame = await connection.query(`SELECT * FROM games WHERE name='${body.name}'`);
        if (checkExistingGame.rowCount > 0) {
            return res.status(409).send("Esse jogo já existe");
        }
        const checkExistingCategory = await connection.query(`
        SELECT games.* FROM games
        JOIN categories
        ON games."categoryId"=categories.id
        WHERE games."categoryId" = ${body.categoryId}
        `)
        if (checkExistingCategory.rowCount > 0) {
            await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${body.name}', '${body.image}', ${body.stockTotal}, ${body.categoryId}, ${body.pricePerDay} )`);
            return res.sendStatus(201);
        }
        else {
            return res.status(400).send("Essa categoria não existe");
        }
        
    } catch (error) {
        return res.status(500).send("Server failed");
    }
}