import { Router } from 'express';
const router = Router();

import accounts from '../controllers/accounts/index.js';

// Login
// Logs in a user
router.post('login', (req, res) => {
    return accounts.login(req, res);
});

// Create Account
// Creates an account given a username and hashed password.
router.post('createAccount', (req, res) => {
    return accounts.createAccount(req, res);
});

// Get User Permissions
// Gets a user's permissions, returned as an array
router.post('getUserPerms', (req, res) => {
    return accounts.getUserPerms(req, res);
});

// Update Account
// Update information about a user's account
router.post('updateAccount', (req, res) => {
    return accounts.updateAccount(req, res);
});
export default router;