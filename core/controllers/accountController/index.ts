import login from './loginController';
import createAccount from './createAccountController';
import getUserPerms from './getUserPermsController';
import updateAccount from './updateAccountController';

// Export all the controllers for the current route.
export default {
	login,
	createAccount,
	getUserPerms,
	updateAccount
};