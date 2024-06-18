import { successHandler as s } from '../misc/miscUtils';

// Exmaple file

const getExample = () => {
	return s(true, 'GET Success!', null);
};

const postExample = (req) => {
	return s(true, 'POST Success!', null);
};

export { getExample, postExample };
