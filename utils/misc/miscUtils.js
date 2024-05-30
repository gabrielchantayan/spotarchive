/**
 * Returns a standardized success message
 * @param {Boolean} success Was the operation a success?
 * @param {String} message The message to return (Optional)
 * @param {} data Whatever data to return (Optional)
 * @returns {Object}
 */
const successHandler = (success, message, data) => {
	// Create the return. Set success to FALSE if nothing is provided
	let ret = {
		success: success || false,
	};

	if (message != null && data != undefined) ret['message'] = message;
	if (data != null && data != undefined) ret['data'] = data;

	return ret;
};

/**
 * Shorthand function to stringify JSON
 * @param {Object} json JSON object to prettify
 * @returns Stringified JSON
 */
const stringifyJSON = (json) => {
	return JSON.stringify(json, null, 2); 
}

export { successHandler, stringifyJSON };
