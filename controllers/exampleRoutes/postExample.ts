import asyncWrapper from '../../middleware/asyncWrapper';
import { postExample as mainFunction } from '../../utils/example/example';
import { successHandler } from '../../utils/misc/miscUtils';

// POST Example
// Example POST Route
const postExample = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default postExample;
