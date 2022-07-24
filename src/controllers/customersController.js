import connection from "../db/database.js";


export async function getCustomers (req, res) {
    const cpfQuery = req.query.cpf;
    console.log(typeof(cpfQuery))
    let query;
    try {
        if (cpfQuery !== undefined) {
            query = `
            SELECT * FROM customers
            WHERE cpf
            LIKE '${cpfQuery}%'
            `;
        }
        else {
            query = `
            SELECT * FROM customers`;
        }
        const { rows: customers } = await connection.query(query);
        return res.send(customers);
    } catch (error) {
        return res.status(500).send(error);
    }
}