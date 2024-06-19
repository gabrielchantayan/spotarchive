let doesLogDB = true || process.env.DOESLOGDB;

const logDB = (message) => {
	if (doesLogDB) console.log(`[AUTH.DB] (${new Date().toISOString()}) ${message}`);
};

/**
 * Logs a message with an [AUTH] tag and timestamp.
 *
 * @param {string} message - The message to be logged.
 */
const log = (message: string) => {
	console.log(`[AUTH] (${new Date().toISOString()}) ${message}`);
};

const logDebug = (message: string) => {
	console.log(`[AUTH.DEBUG] (${new Date().toISOString()}) ${message}`);
};

export { log, logDB, logDebug };
