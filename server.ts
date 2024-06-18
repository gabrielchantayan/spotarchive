// Prereqs
import express from 'express'; // Webserver
import routes from './routes/index.js'; // API Routes
import cors from 'cors';
import initialize from './utils/server/initialize';
import queryString from 'query-string';


// Set up on port
const port = process.env.PORT || 80;

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Main function
const main = ()  => {
	// Setup express webserver
	const app : any= express();

	// CORS things
	app.use(cors());
	app.options('*', cors());

	
	/**
	 * Middleware for allowing all origins, and all headers.
	 * The next() function passes control to the next middleware
	 * function in the stack.
	 */
	app.use((req, res, next) => {
		// Allow all origins
		res.header('Access-Control-Allow-Origin', '*');

		// Allow all headers
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

		// Pass control to the next middleware function
		next();
	});

	// Allow webserver to handle JSON files
	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb' }));
	app.use(express.static('public'));
	app.use(express.urlencoded({ extended: true }));

	// Listen to API routes
	for (let key of Object.keys(routes)) {
		app.use(`/api/${key}`, routes[key]);
	}


	var client_id = 'CLIENT_ID';
	var redirect_uri = 'http://localhost:8888/callback';


	app.get('/login', function (req, res) {
		var state = 'dhwwow13odcv34dd';
		var scope =
			'user-read-private user-read-email playlist-read-private playlist-modify-private   ugc-image-upload';

		res.redirect(
			'https://accounts.spotify.com/authorize?' +
				querystring.stringify({
					response_type: 'code',
					client_id: client_id,
					scope: scope,
					redirect_uri: redirect_uri,
					state: state,
				})
		);
	});

	// If we are in prod, use the build folder
	if (process.env.NODE_ENV == 'production') {
		app.use(express.static('client/build'));

		app.get('*', (req, res) => {
			res.sendFile('client/build/index.html', { root: './' });
		});
	}

	// Open up on port XXXX
	app.listen(port, () => {
		console.log(`Backend live on ${port}`);
	});
};

await initialize();
main();
