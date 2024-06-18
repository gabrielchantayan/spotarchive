let doesLogDB = true || process.env.DOESLOGDB;

const logDB = (message) => {
	if (doesLogDB) console.log(`[DB] ${message}`);
};

export { logDB };
