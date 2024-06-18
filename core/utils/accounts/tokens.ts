import * as db from '../database/postgres';
import { successHandler } from '../misc/miscUtils';

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
	const existingAccount: boolean = await db.checkIfExists('users', {
		username: username,
		token: token,
	});

	// If it exists, return true
	if (existingAccount == true) {
		return successHandler(true, null, null);
	}
	// Else, return false for invalid session error
	else {
		return successHandler(false, 'Invalid session', null);
	}
};

export { genToken, verifyLogin };
