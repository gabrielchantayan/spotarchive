import asyncWrapper from '../../middleware/asyncWrapper';
import { getExample as mainFunction } from '../../utils/example/example';
import { successHandler } from '../../utils/misc/miscUtils';

// Alternative Example
// This route uses an alternative endpoint
const alternativeEndpointExample = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default alternativeEndpointExample;
