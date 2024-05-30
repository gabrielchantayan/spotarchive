import * as db from '../database/mongo.js';
import { successHandler } from '../misc/miscUtils.js';
import * as password from './password.js';
import { checkPermission } from './permissions.js';
import { genToken } from './tokens.js';

/**
 * Create an account
 * @param {Object} data The data to be updated. Typically includes fields: username, password, firstName, lastName, email, permissions[], active (bool)
 * @returns {Object} {success: bool, reason: string}
 */
const createAccount = async (data) => {
	console.log(data);

	// Verify that the username doesn't already exist in the system
	let existingAccount = await db.checkIfExists('users', {
		username: data['username'],
	});

	// If it doesnt
	if (existingAccount == 0) {
		// Hash and salt the password
		let hashedPassword = await password.hashPassword(data['password']);

		// Insert the stuff into the database
		await db.insert('users', {
			username: data['username'],
			password: hashedPassword,
			active: true,
		});

		// Return true

		return successHandler(
			true,
			`Successfully created user ${data['username']}`
		);
	}

	// If the user already exists return false
	else {
		console.log('Exists!');
		return successHandler(
			false,
			`User ${data['username']} already exists!`
		);
	}
};

/**
 * Update an account
 * @param {Object} data The data to be updated. Typically includes fields: username, password, firstName, lastName, email, permissions[], active (bool)
 * @returns {Object} {success: bool, reason: string}
 */
const updateAccount = async (data) => {
	// If they want to change the password
	if (data['operation'] == 'passwordChange') {
		// Check if either of the following is true:
		// 1) The actor has permissions to manage users
		// 2) The actor is changing their own password
		// If not then throw an error
		if (
			!checkPermission(
				'Manage Users',
				data['actor']['username'],
				data['actor']['token']
			) ||
			data['actor']['username'] != data['data']['username']
		) {
			return successHandler(
				false,
				'User does not have permissions to change passwords'
			);
		} else {
			// Hash the password
			let hashedPassword = await password.hashPassword(
				data['data']['password']
			);

			// Update the user and reset their token, forcing them to log in again
			await db.update(
				'users',
				{ username: data['data']['username'] },
				{
					password: hashedPassword,
					token: '',
					lastChangedPassword: Date.now(),
				}
			);

			return successHandler(
				true,
				`Updated password for ${data['data']['username']}`
			);
		}
	}

	// If they want to update information
	if (data['operation'] == 'updateInfo') {
		// Check if either of the following is true:
		// 1) The actor has permissions to manage users
		// 2) The actor is changing their own info
		// If not then throw an error

		console.log(
			!checkPermission(
				'Manage Users',
				data['actor']['username'],
				data['actor']['token']
			)
		);
		console.log(data['actor']['username'] != data['data']['username']);

		if (
			!checkPermission(
				'Manage Users',
				data['actor']['username'],
				data['actor']['token']
			)
		) {
			return successHandler(
				false,
				'User does not have permissions to update information.'
			);
		} else {
			// Just to be safe
			delete data['data']['password'];
			delete data['data']['_id'];

			// Insert the stuff into the database
			await db.update(
				'users',
				{ username: data['data']['username'] },
				{ ...data['data'] }
			);

			return successHandler(
				true,
				`Updated info for ${data['data']['username']}`
			);
		}
	}
};

/**
 * Gets a list of all users
 * @returns {Array}
 */
const getListOfUsers = async (data) => {
	// Get a list of all users from the DB
	const retUsers = await db.findAll('users');

	// Return array
	let ret = [];

	// Push each user's username to the return array
	retUsers.forEach((u) => {
		ret.push(u.username);
	});

	return successHandler(true, 'Found list of users!', ret);
};

/**
 * Log in a user and return their token
 * @param {Object} data {username: string, password: string}
 * @returns {Object} {success: bool, reason: string, token: string, fullName: string}
 */
const login = async (data) => {
	console.log(data);

	// Verify that the username doesn't already exist in the system
	let existingAccount = await db.checkIfExists('users', {
		username: data['username'],
	});

	// If the account does not exist, return with an error message
	if (existingAccount == 0) {
		console.log('User does not exist!');
		return successHandler(false, 'Incorrect username or password');
	} else {
		console.log('Exists!');

		// Grab the user's data
		const userData = await db.findOne('users', {
			username: data['username'],
		});

		if (!userData['active'])
			return successHandler(false, 'User is not active');

		// Check if the password matches
		const passwordMatches = await password.checkMatchingHash(
			data['password'],
			userData['password']
		);

		// If it does...
		if (passwordMatches) {
			// Generate a token
			let token = genToken();

			const setNewLogin = await db.update(
				'users',
				{ username: data['username'] },
				{
					token: token,
					lastLogin: Date.now(),
				}
			);

			return successHandler(true, 'User logged in', { token: token });
		}

		// Otherwise, return false with an error message
		else {
			return successHandler(false, 'Incorrect username or password');
		}
	}
};

/**
 * Get the full data of someone's account
 * @param {String} username Username of user you want to get
 * @param {String} token Token of user you want to get
 * @returns
 */
const getAccountDataWithToken = async (username, token) => {
	let existingAccount = await db.checkIfExists('users', {
		username: username,
		token: token,
	});

	// If the account does not exist, return with an error message
	if (existingAccount == 0) {
		return successHandler(false, 'Invalid session');
	} else {
		const userData = await db.findOne('users', {
			username: username,
			token: token,
		});

		return successHandler(true, null, userData);
	}
};

/**
 * Get the partial data of someone's account. Redacts token and password
 * @param {String} username Username of user you want to get
 * @returns
 */
const getAccountData = async (username) => {
	let existingAccount = await db.checkIfExists('users', {
		username: username,
	});

	// If the account does not exist, return with an error message
	if (existingAccount == 0) {
		return successHandler(false, 'Invalid session');
	} else {
		let userData = await db.findOne('users', { username: username });
		delete userData.token;
		delete userData.password;

		return successHandler(true, null, userData);

	}
};

const updateOwnPassword = async (data) => {
	const hashedPassword = await password.hashPassword(data['password']);

	const setNewPassword = await db.update(
		'users',
		{ username: data['username'], token: data['token'] },
		{
			password: hashedPassword,
			lastChangedPassword: Date.now(),
		}
	);

	return successHandler(true, 'Updated password')
};

export {
	createAccount,
	login,
	getAccountDataWithToken,
	updateOwnPassword,
	updateAccount,
	getAccountData,
	getListOfUsers,
};
