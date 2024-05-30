import { successHandler as s } from '../misc/miscUtils.js';

// Exmaple file

const getExample = () => {
	return s(true, 'GET Success!');
};

const postExample = () => {
	return s(true, 'POST Success!');
};

export { getExample, postExample };
