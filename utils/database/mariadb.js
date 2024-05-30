const db_url = '127.0.0.1:3306/';

const mariadb = require('mariadb');

const conn = await mariadb.createConnection({
	host: db_url,
	// user: process.env.DB_USER,
	password: 'password',
});



const createTable = async (table) => {

    const sql = `CREATE TABLE IF NOT EXISTS ${table} (
        id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id)
    )`;
}