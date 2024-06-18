import { writeFile } from 'fs/promises';
import { checkAndCreateDir } from '../../code/files';

/**
 * Generate an endpoint's controller file
 * @param {String} route The route to put the file under
 * @param {String} endpoint The endpoint
 * @param {Object} data The endpoint's data as specified in apiRoutes.json
 */
const generateControllerFile = async (service: string, route, endpoint, data) => {
	console.log(data);
	// The file
	let file = `import asyncWrapper from '../../middleware/asyncWrapper';
import { ${data.primaryFunction} as mainFunction } from '../../${data.primaryFunctionFile}';
import { successHandler } from '../../utils/misc/miscUtils';

// ${data.name}
// ${data.description}
const ${endpoint} = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(${data.hasOwnProperty('functionArgs') ? data.functionArgs : 'req'});

    res.status(200).json(successHandler(true, null, ret));

});

export default ${endpoint};
`;

	// Write the file
	await writeFile(`../${service}/controllers/${route}Controller/${endpoint}Controller.ts`, file);
	console.log(`Wrote ${service}/controllers/${route}Controller/${endpoint}Controller.ts`);
};

/**
 * This function generates the controller index file for a given route.
 *
 * @param {string} service - The name of the service.
 * @param {string} route - The route to save the file to.
 * @param {Array<string>} endpoints - An array of each endpoint.
 * @returns {Promise<void>} - A promise that resolves when the file is written.
 */
const generateControllerIndexFile = async (service: string, route, endpoints) => {
	// Create empty file
	let file = '';

	// Map every endpoint to an import
	file += endpoints
		.map((endpoint) => {
			// Generate each import statement
			return `import ${endpoint} from './${endpoint}Controller';`;
		})
		.join('\n');

	// Add the default export
	file += `\n\n// Export all the controllers for the current route.\n`;
	file += `export default {\n\t${endpoints.join(',\n\t')}\n};`;

	// Write the file
	await writeFile(`../${service}/controllers/${route}Controller/index.ts`, file);

	console.log(`Wrote ${service}/controllers/${route}Controller/index.ts`);
};

/**
 * Generate a route's file
 * @param {String} route The route to save the endpoints under
 * @param {Object} endpoints The endpoint object for the given route
 */
const generateRouteFile = async (service: string, route, endpoints) => {
	let file = `import { Router } from 'express';
const router = Router();

import ${route} from '../controllers/${route}Controller/index';
`;

	for (const [endpoint, data] of Object.entries(endpoints)) {
		file += `
// ${data['name']}
// ${data['description']}
router.${data['type'].toLowerCase()}('/${
			data.hasOwnProperty('endpoint') ? data['endpoint'] : endpoint
		}', (req, res) => {
    return ${route}.${endpoint}(req, res);
});
`;
	}

	file += 'export default router;';

	// Write the file
	await writeFile(`../${service}/routes/${route}Routes.ts`, file);

	console.log(`Wrote ${service}/routes/${route}Routes.ts`);
};

/**
 * Creates an index file that exports all the given routes.
 *
 * @param {string} service - The name of the service.
 * @param {Array<string>} routes - The routes to export.
 * @return {Promise<void>} - A promise that resolves when the file is written.
 */
const generateRouteIndexFile = async (service: string, routes: Array<string>) => {
	// Create an empty file.
	let file = '';

	// Map every route to an import statement.
	file += routes
		.map((route) => {
			return `import ${route} from './${route}Routes';`;
		})
		.join('\n');

	// Add the default export.
	file += `\n\n// Export all the routes.`;
	file += `\nexport default {\n\t${routes.join(',\n\t')}\n};`;

	/// Write the file.
	await writeFile(`../${service}/routes/index.ts`, file);

	console.log(`Wrote ${service}/routes/index.ts`);
};

/**
 * Generates TypeScript files for each route and endpoint in the `routesFile` object.
 *
 * @param {string} service - The name of the service.
 * @param {Object} routes - The routes object.
 * @return {Promise<void>} A promise that resolves when all files have been generated.
 */
const generateTS = async (service: string, routes) => {
	// Initialize an array to hold the route names
	let routeList: string[] = [];

	// Iterate through each route
	for (const [route, endpoints] of Object.entries(routes)) {
		// Push the route name to the route list
		routeList.push(route);

		// Create an empty array for the endpoints of the current route
		let currentRouteEndpoints: string[] = [];

		// Create the necessary directory for the current route
		await checkAndCreateDir(`../${service}/controllers/${route}Controller`);

		// Iterate through each endpoint
		for (const [endpoint, data] of Object.entries(endpoints)) {
			// Push the endpoint name to the current route endpoints
			currentRouteEndpoints.push(endpoint);

			// Generate the controller file
			generateControllerFile(service, route, endpoint, data);
		}

		// Generate the controller index file
		generateControllerIndexFile(service, route, Object.keys(endpoints));

		// Generate the route file
		generateRouteFile(service, route, endpoints);
	}

	// Generate the route index file
	generateRouteIndexFile(service, Object.keys(routes));
};

export { generateTS };
