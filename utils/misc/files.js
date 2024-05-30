import { access, mkdir } from 'fs/promises';

// Check if a file exists
const check = async (path) => {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
};

// Check if a directory exists and if not then create it
const checkAndCreateDir = async (directory) => {
	let dirExists = false;

	// Docker is being strange so try/catch it
	try {
		dirExists = await check(directory);
	} catch (e) {
		console.log(e);
		dirExists = false;
	}

	// If not, create it
	if (!dirExists) {
		console.log(`Creating ${directory}...`);

		try {
			const createDir = await mkdir(directory, { recursive: true });
			console.log(`Created ${createDir}`);
		} catch (e) {
			console.log(e.message);
		}
	}
};

export { check, checkAndCreateDir };
