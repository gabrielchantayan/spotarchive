import { MongoClient } from 'mongodb';
import { logDB } from '../misc/logger.js';
import { successHandler as s } from '../misc/miscUtils.js';
import { stringifyJSON } from '../misc/miscUtils.js';
const db_url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(db_url);

const dbName = 'testDB';

await client.connect();
/**
 * Insert data into a collection
 * @param {String} collectionName The collection name you want to insert to
 * @param {Object} data The data you want to insert
 */
const insert = async (collectionName, data) => {
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const insertResult = await collection.insertOne(data);

	logDB(`Inserted in to ${collectionName}`);

	return s(insertResult['acknowledged']);
};

/**
 * Finds all items in a collection
 * @param {String} collectionName The collection name you want to find
 * @returns {Object} Standard return.
 */
const findAll = async (collectionName) => {
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const findAllResult = await collection.find({}).toArray();

	logDB(`Found all items in ${collectionName}`);

	return s(true, null, findAllResult);
};

/**
 * Find an object
 * @param {String} collectionName
 * @param {Object} query
 */
const find = async (collectionName, query) => {
	// Connect to the DB then to the collection
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const findResult = await collection.find(query).toArray();

	logDB(
		`Found all items in ${collectionName} with query ${stringifyJSON(query)}`
	);

	return s(true, null, findResult);
};

/**
 * Find an object
 * @param {String} collectionName
 * @param {Object} query
 */
const findOne = async (collectionName, query) => {
	// Connect to the DB then to the collection
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	// Get the result
	const findOneResult = await collection.findOne(query);

	// Log if worked
	logDB(
		`${
			findOneResult == null ? 'Did not find' : 'Found'
		} one item in ${collectionName} with query ${stringifyJSON(query)}`
	);

	// Returned
	return s(findOneResult == null ? false : true, null, findOneResult);
};

/**
 * Updates a single entry (first matching result)
 * @param {String} collectionName The collection you want to update
 * @param {Object} query The query you want to match
 * @param {Object} updatedValue The values you want to update
 */
const update = async (collectionName, query, updatedValue) => {
	// Connect to the DB then to the collection
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const updateResult = await collection.updateOne(query, {
		$set: updatedValue,
	});

	logDB(
		`Updated item in ${collectionName} with query ${stringifyJSON(query)}`
	);

	return s(true, null, updateResult);
};

/**
 * Updates multiple entries
 * @param {String} collectionName The collection you want to update
 * @param {Object} query The query you want to match
 * @param {Object} updatedValue The values you want to update
 */
const updateMany = async (collectionName, query, updatedValue) => {
	// Connect to the DB then to the collection
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const updateResult = await collection.updateMany(query, {
		$set: updatedValue,
	});

	logDB(
		`Updated items in ${collectionName} with query ${stringifyJSON(query)}`
	);

	return s(true, null, updateResult);
};

/**
 * Check if document exists
 * @param {String} collectionName
 * @param {Object} query
 * @returns
 */
const checkIfExists = async (collectionName, query) => {
	// Connect to the DB then to the collection
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const countResult = await collection.countDocuments(query);

	logDB(
		`Checked if a result in ${collectionName} with query ${stringifyJSON(
			query
		)} exists`
	);

	return s(true, null, countResult);
};

/**
 * Creates a collection
 * @param {String} collectionName The name of the collection
 */
const createCollection = async (collectionName) => {
	// Connect to db
	const db = client.db(dbName);

	// Create db
	db.createCollection(collectionName, (err, res) => {
		if (err) return s(false, err);
		console.log('Collection created!');
	});

    return s(true)
};

export {
	insert,
	findOne,
	find,
	findAll,
	update,
	updateMany,
	checkIfExists,
	createCollection,
};
