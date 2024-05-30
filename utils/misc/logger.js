let doesLogDB = true || PROCESS.ENV.DOESLOGDB;

const logDB = (message) => {
	if (doesLogDB) console.log(`[DB] ${message}`);
};

export { logDB };
