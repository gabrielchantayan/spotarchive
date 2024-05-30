import { Router } from 'express';
const router = Router();

import exampleRoutes from '../controllers/exampleRoutes/index.js';

// GET Example
// Example GET Route
router.get('getExample', (req, res) => {
    return exampleRoutes.getExample(req, res);
});

// POST Example
// Example POST Route
router.post('postExample', (req, res) => {
    return exampleRoutes.postExample(req, res);
});

// Alternative Example
// This route uses an alternative endpoint
router.post('foo/bar', (req, res) => {
    return exampleRoutes.alternativeEndpointExample(req, res);
});
export default router;