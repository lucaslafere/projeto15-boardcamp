import connection from "../db/database.js";
import { customersSchema } from "../schemas/customersSchema.js";

export async function getCustomers(req, res) {
  const cpfQuery = req.query.cpf;
  let query;
  try {
    if (cpfQuery !== undefined) {
      query = `
            SELECT * FROM customers
            WHERE cpf
            LIKE '${cpfQuery}%'
            `;
    } else {
      query = `
            SELECT * FROM customers`;
    }
    const { rows: customers } = await connection.query(query);
    return res.send(customers);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params;
  try {
    const checkId = await connection.query(
      `
        SELECT * FROM customers WHERE id=$1`,
      [id]
    );
    if (checkId.rowCount === 0) return res.sendStatus(404);
    else {
      const { rows: customers } = await connection.query(
        `
            SELECT * FROM customers WHERE id=$1`,
        [id]
      );
      return res.send(customers[0]);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function postCustomers(req, res) {
  const body = req.body;
  const { name, phone, cpf, birthday } = req.body;
  const { error } = customersSchema.validate(body);
  if (error) return res.sendStatus(400);
  try {
    const checkExistingCPF = await connection.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );
    if (checkExistingCPF.rowCount > 0) {
      return res.sendStatus(409);
    } else if (checkExistingCPF.rowCount === 0) {
      await connection.query(`INSERT INTO customers
         (
            name, phone, cpf, birthday
            )
          VALUES (
            '${name}', '${phone}', '${cpf}', '${birthday}'
        )`);
      return res.sendStatus(201);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function updateCustomers (req,res) {
    const body = req.body;
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;
    const {error} = customersSchema.validate(body)
    if (error ) return res.sendStatus (400);
    try {
        const checkExistingCPF = await connection.query(
            `SELECT * FROM customers WHERE cpf = $1`,
            [cpf]
          );
          const checkSameUser = await connection.query(
            `SELECT * FROM customers WHERE cpf = $1 AND id = $2`,
            [cpf, id]
          )
          if (checkExistingCPF.rowCount > 0 && checkSameUser.rowCount === 0) {
            return res.sendStatus(409);
          }
          else {
            await connection.query(`
            UPDATE customers SET
            name = $1, phone = $2, cpf = $3, birthday = $4 
            WHERE id = $5
            `,
            [name, phone, cpf, birthday, id]);
            return res.sendStatus(200);
          } 
    } catch (error) {
        return res.status(500).send(error);
    }
}
