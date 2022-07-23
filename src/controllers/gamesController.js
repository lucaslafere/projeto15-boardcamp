import connection from "../db/database.js";
import { gamesPostSchema } from "../schemas/gamesSchema.js";


// falta adicionar query string 
export async function getGames (req, res) {
    const name = req.query.name;
    let query;
    try {
        if (name !== undefined) {
            const nameLowerCase = name.toLowerCase();
            query = `
            SELECT games.*, categories.name as "categoryName" FROM games 
            JOIN categories
            ON games."categoryId"=categories.id
            WHERE name
            LIKE '${nameLowerCase}%'`;
        }
        else {
            query = `
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories 
            ON games."categoryId"=categories.id`;
        }
        console.log(query)
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
        const createGame = await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${body.name}', '${body.image}', ${body.stockTotal}, ${body.categoryId}, ${body.pricePerDay} )`);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Server failed");
    }
}