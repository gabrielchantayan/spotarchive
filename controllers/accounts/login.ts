import asyncWrapper from '../../middleware/asyncWrapper.ts';
import { login as mainFunction } from '../../utils/accounts/accounts.js';
import { successHandler } from '../../utils/misc/miscUtils.ts';

// Login
// Logs in a user
const login = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default login;
