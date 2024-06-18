

/**
 * Logs a message with an [AUTH] tag and timestamp.
 *
 * @param {string} message - The message to be logged.
 */
const log = (message: string) => {
    console.log(`[AUTH] (${new Date().toISOString()}) ${message}`);
}

export { log }