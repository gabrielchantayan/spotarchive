import { access, mkdir } from 'fs/promises';

/**
 * Check if a file exists
 * @param {string} path - The path of the file to check
 * @returns {Promise<boolean>} - Promise that resolves to true if the file exists, false otherwise
 */
const check = async (path: string): Promise<boolean> => {
	try {
		// Attempt to access the file
		await access(path);
		// If no error is thrown, return true
		return true;
	} catch {
		// If an error is thrown, return false
		return false;
	}
};

/**
 * Check if a directory exists and if not then create it
 * @param {string} directory - The path of the directory to check or create
 * @returns {Promise<void>} - Promise that resolves when the directory is created
 */
const checkAndCreateDir = async (directory: string) => {
	// Check if the directory already exists
	let dirExists = false;
	try {
		dirExists = await check(directory);
	} catch (e) {
		// If there's an error, log it and set dirExists to false
		console.log(e);
		dirExists = false;
	}

	// If the directory doesn't exist, create it
	if (!dirExists) {
		// Log that the directory is being created
		console.log(`Creating ${directory}...`);

		try {
			// Create the directory with recursive option
			const createDir = await mkdir(directory, { recursive: true });
			// Log that the directory was successfully created
			console.log(`Created ${createDir}`);
		} catch (e) {
			// If there's an error, log the error message
			console.log(e.message);
		}
	}
};

export { check, checkAndCreateDir };
