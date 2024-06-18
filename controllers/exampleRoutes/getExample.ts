import asyncWrapper from '../../middleware/asyncWrapper.ts';
import { getExample as mainFunction } from '../../utils/example/example.js';
import { successHandler } from '../../utils/misc/miscUtils.ts';

// GET Example
// Example GET Route
const getExample = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default getExample;
