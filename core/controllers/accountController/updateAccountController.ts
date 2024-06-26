import asyncWrapper from '../../middleware/asyncWrapper';
import { updateAccount as mainFunction } from '../../utils/accounts/accounts';
import { successHandler } from '../../utils/misc/miscUtils';

// Update Account
// Update information about a user's account
const updateAccount = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default updateAccount;
