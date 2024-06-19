/**
 * Returns a standardized success message.
 *
 * @param {boolean} success - Was the operation a success?
 * @param {string} [message] - The message to return (Optional)
 * @param {any} [data] - Whatever data to return (Optional)
 * @returns {Object} - The success message object.
 */
const successHandler = (success: boolean, message?: string, data?: any): { success: boolean, message?: string, data?: any } => {
	// Create the return. Set success to FALSE if nothing is provided
	let ret = {
		success: success || false, // Set success to false if nothing is provided
	};

	// Add message to the return if it is not null or undefined
	if (message != null && data != undefined) {
		ret['message'] = message;
	}

	// Add data to the return if it is not null or undefined
	if (data != null && data != undefined) {
		ret['data'] = data;
	}

	return ret;
};

/**
 * Shorthand function to stringify JSON
 * @param {Object} json - JSON object to prettify
 * @returns {string} - Stringified JSON
 */
const stringifyJSON = (json: any): string => {
	// Create the return
	return JSON.stringify(json, null, 2); 
}

export { successHandler, stringifyJSON };
