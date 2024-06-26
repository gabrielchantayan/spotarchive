import asyncWrapper from '../../middleware/asyncWrapper';
import { getUserPermissions as mainFunction } from '../../utils/accounts/permissions';
import { successHandler } from '../../utils/misc/miscUtils';

// Get User Permissions
// Gets a user's permissions, returned as an array
const getUserPerms = asyncWrapper(async (req, res) => {

    const ret = await mainFunction(req.username, req.token);

    res.status(200).json(successHandler(true, null, ret));

});

export default getUserPerms;
