import asyncWrapper from '../../middleware/asyncWrapper.js';
import { getUserPermissions as mainFunction } from '../../utils/accounts/permissions.js';
import { successHandler } from '../../utils/misc/miscUtils.js';

// Get User Permissions
// Gets a user's permissions, returned as an array
const getUserPerms = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req);

    res.status(200).json(successHandler(true, null, ret));

});

export default getUserPerms;
