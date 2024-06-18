import { readFile, writeFile } from 'fs/promises';
import * as ts from './languages/ts'
import { checkAndCreateDir } from '../code/files';


const main = async () => {
	// Read the API Routes file and parse the JSON
	const routesFileRAW: any = await readFile('./devtools/editables/apiRoutes.json');
	const routesFile = JSON.parse(routesFileRAW);

	let routeList: string[] = [];

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
			ts.generateControllerFile(route, endpoint, data);
		}

		// Generate the controller index file
		ts.generateControllerIndexFile(route, Object.keys(endpoints));

		// Generate the route file
		ts.generateRouteFile(route, endpoints);
	}

	// Generate the route index file
	ts.generateRouteIndexFile(Object.keys(routesFile));
};


main();
