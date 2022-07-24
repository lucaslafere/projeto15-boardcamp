import connection from "../db/database.js";


export async function getCustomers (req, res) {
    const cpfQuery = req.query.cpf;
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

export async function getCustomersById (req, res) {
    const { id } = req.params;
    try {
        const query = `
        SELECT * FROM customers WHERE id=$1`
        const { rows: customers } = await connection.query(query, [id]);
        return res.send(customers[0]);
    } catch (error) {
        return res.status(500).send(error);
    }
    
}