// Import express
import express from 'express';
import queryString from 'query-string';
import { generateRandomString } from './utils/utils';

// Import tokens from secrets.json
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './secrets.json';

var app = express();

app.get('/login', function (req, res) {
	var state = generateRandomString(16);
	var scope = 'user-read-private user-read-email';

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			queryString.stringify({
				response_type: 'code',
				client_id: CLIENT_ID,
				scope: scope,
				redirect_uri: REDIRECT_URI,
				state: state,
			})
	);
});
