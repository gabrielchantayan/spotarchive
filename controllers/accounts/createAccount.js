import asyncWrapper from '../../middleware/asyncWrapper.js';
import { createAccount as mainFunction } from '../../utils/accounts/accounts.js';
import { successHandler } from '../../utils/misc/miscUtils.js';

// Create Account
// Creates an account given a username and hashed password.
const createAccount = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default createAccount;
