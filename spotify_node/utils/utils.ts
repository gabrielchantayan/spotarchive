
/**
 * Generates a random string of a given length.
 *
 * @param {number} length The length of the string to generate.
 *
 * @returns {string} The generated random string.
 */
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};


export { generateRandomString }