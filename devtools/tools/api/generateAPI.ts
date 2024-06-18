import { readFile, writeFile } from 'fs/promises';
import { generateTS } from './languages/ts'
import { checkAndCreateDir } from '../code/files';


const main = async () => {
	// Read the API Routes file and parse the JSON
	const routesFileRAW: any = await readFile('./tools/api/apiRoutes.json');
	const routesFile = JSON.parse(routesFileRAW);




	// Iterate through each service in the routes file
	for (const [service, serviceData] of Object.entries(routesFile)) {

		// Check what language the service is written in
		switch (serviceData['language']) {
			case 'ts':
				await generateTS(service, serviceData['routes']);
				break;
			default:
				break;
		}

	}



	
};




main();
