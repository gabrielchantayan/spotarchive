import { Router } from 'express';
const router = Router();

import account from '../controllers/accountController/index';

// Login
// Logs in a user
router.post('/login', (req, res) => {
    return account.login(req, res);
});

// Create Account
// Creates an account given a username and hashed password.
router.post('/createAccount', (req, res) => {
    return account.createAccount(req, res);
});

// Get User Permissions
// Gets a user's permissions, returned as an array
router.post('/getUserPerms', (req, res) => {
    return account.getUserPerms(req, res);
});

// Update Account
// Update information about a user's account
router.post('/updateAccount', (req, res) => {
    return account.updateAccount(req, res);
});
export default router;