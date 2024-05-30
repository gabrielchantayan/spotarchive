import * as db from '../database/mongo.js';
import { successHandler } from '../misc/miscUtils.js';

/**
 * Generates a random token
 * @returns String
 */
const genToken = () => {
	return `${Math.random().toString(36).substr(2)}${Math.random()
		.toString(36)
		.substr(2)}`;
};

const verifyLogin = async (username, token) => {
	// Verify if there exists an entry with the username and token combo
	const existingAccount = await db.checkIfExists('users', {
		username: username,
		token: token,
	});

	// If it exists, return true
	if (existingAccount == 1) {
		return successHandler(true);
	}
	// Else, return false for invalid session error
	else {
		return successHandler(false, 'Invalid session');
	}
};

export { genToken, verifyLogin };
