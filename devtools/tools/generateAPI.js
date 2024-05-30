import { readFile, writeFile } from 'fs/promises';
import { checkAndCreateDir } from '../../utils/misc/files.js';

const main = async () => {
	// Read the API Routes file and parse the JSON
	const routesFileRAW = await readFile('./devtools/editables/apiRoutes.json');
	const routesFile = JSON.parse(routesFileRAW);

	await checkAndCreateDir('./controllers');
	await checkAndCreateDir('./routes');

	let routeList = [];

	// Iterate through each route
	for (const [route, endpoints] of Object.entries(routesFile)) {
		// Push the route name to levelOne
		routeList.push(route);

		// Create an empty array for the endpoints of the current route
		let currentRouteEndpoints = [];

		await checkAndCreateDir(`./controllers/${route}`);

		// Iterate through each endpoint
		for (const [endpoint, data] of Object.entries(endpoints)) {
			// Push the endpoint name to the current route endpoints
			currentRouteEndpoints.push(endpoint);

			// Generate the controller file
			generateControllerFile(route, endpoint, data);
		}

		// Generate the controller index file
		generateControllerIndexFile(route, Object.keys(endpoints));

		// Generate the route file
		generateRouteFile(route, endpoints);
	}

	// Generate the route index file
	generateRouteIndexFile(Object.keys(routesFile));
};

/**
 * Generate an endpoint's controller file
 * @param {String} route The route to put the file under
 * @param {String} endpoint The endpoint
 * @param {Object} data The endpoint's data as specified in apiRoutes.json
 */
const generateControllerFile = async (route, endpoint, data) => {
	// The file
	let file = 
`import asyncWrapper from '../../middleware/asyncWrapper.js';
import { ${data.primaryFunction} as mainFunction } from '../../${data.primaryFunctionFile}';
import { successHandler } from '../../utils/misc/miscUtils.js';

// ${data.name}
// ${data.description}
const ${endpoint} = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default ${endpoint};
`;

	// Write the file
	await writeFile(`./controllers/${route}/${endpoint}.js`, file);
	console.log(`Wrote ./controllers/${route}/${endpoint}.js`);
};

/**
 * Create the controller index file for a routeß
 * @param {String} route The route to save the file to
 * @param {Array} endpoints Array of each endpoint
 */
const generateControllerIndexFile = async (route, endpoints) => {
	// Create empty file
	let file = '';

	// Map every endpoint to an import
	file += endpoints
		.map((e) => {
			return `import ${e} from './${e}.js';`;
		})
		.join('\n');

	// Add the default export
	file += `\n\nexport default {
\t${endpoints.join(',\n\t')}
};
`;

	// Write the file
	await writeFile(`./controllers/${route}/index.js`, file);
	
};

/**
 * Generate a route's file
 * @param {String} route The route to save the endpoints under
 * @param {Object} endpoints The endpoint object for the given route
 */
const generateRouteFile = async (route, endpoints) => {
	let file = `import { Router } from 'express';
const router = Router();

import ${route} from '../controllers/${route}/index.js';
`;

	for (const [endpoint, data] of Object.entries(endpoints)) {
		file += `
// ${data.name}
// ${data.description}
router.${data.type.toLowerCase()}('/${
			data.hasOwnProperty('endpoint') ? data.endpoint : endpoint
		}', (req, res) => {
    return ${route}.${endpoint}(req, res);
});
`;
	}

	file += 'export default router;';

	// Write the file
	await writeFile(`./routes/${route}.js`, file);
};

/**
 * Create an index file from the given routes
 * @param {Array} routes All the routes
 */
const generateRouteIndexFile = async (routes) => {
	// Create empty file
	let file = '';

	// Map every route to an import
	file += routes
		.map((e) => {
			return `import ${e} from './${e}.js';`;
		})
		.join('\n');

	// Add the default export
	file += `\n\nexport default {
\t${routes.join(',\n\t')}
};
`;

	/// Write the file
	await writeFile(`./routes/index.js`, file);
};

main();
