//Import postgres
import * as pg from 'pg';

const { Client } = pg;
const client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
// await client.connect();

// const res = await client.query('SELECT $1::text as message', ['Hello world!']);
// console.log(res.rows[0].message); // Hello world!
// await client.end();

/**
 * Initializes the database by connecting to it and creating the "spotarchive" database if it doesn't exist.
 *
 * @return {Promise<boolean>} A promise that resolves to `true` if the database is successfully initialized.
 */
const initDB = async () => {
	// TODO: Make this less janky
	try {
		// Create the database
		await client.query({
			text: 'CREATE DATABASE IF NOT EXISTS VALUES($1)',
			values: [process.env.DB_NAME],
		});

		// Create tables
		// await createTable('users');
		// await createTable('daylist');
		// await createTable('discoverweekly');

		// // Print out all tables
		// await con.query('SHOW TABLES FROM spotarchive', function (err, result) {
		// 	if (err) throw err;
		// 	console.log(result);
		// });
	} catch (err) {}

	return true;
};

const createTable = async (table, columns) => {
	// Create table ${table} with columns ${columns} in database spotarchive

	let sql = `CREATE TABLE IF NOT EXISTS ${table} (${columns})`;

	console.log(sql);

	// con.query(sql);
};

const checkIfExists = async (table, query) => {
	// Connect to the DB then to the collection
	// const db = client.db(dbName);
	// const collection = db.collection(collectionName);
	return true;
};

const insert = async (table: string, query) => {};

const findAll = async (table: string) => {};

const findOne = async (table: string, query) => {};

const find = async (query) => {};

const update = async (table: string, query, updatedValue) => {};

export { initDB, createTable, checkIfExists, insert, findAll, findOne, find, update };
