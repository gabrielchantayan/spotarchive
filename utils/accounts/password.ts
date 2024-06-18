import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Hash a password
 * @param {String} password Plaintext password
 * @returns {String} Hashed Password
 */
const hashPassword = async (password: string) => {
	const hash: string = await bcrypt.hash(password, saltRounds);
	return hash;
};

/**
 * Compare a hashed password
 * @param {String} password Plaintext password
 * @param {String} hashedPassword Hashed password from the DB
 * @returns {Boolean} True if matched, false if not
 */
const checkMatchingHash = async (password: string, hashedPassword: string) => {
	const match: boolean = await bcrypt.compare(password, hashedPassword);
	return match;
};

export { hashPassword, checkMatchingHash };
