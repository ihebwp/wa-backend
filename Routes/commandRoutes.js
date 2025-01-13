import express from 'express';
import * as commandController from '../Controllers/commandController.js';

const router = express.Router();

// Create a command
router.post('/command', commandController.createCommand);

// Get all Commands
router.get('/commands', commandController.getCommands);

// Get a single Command by ID
router.get('/command/:id', commandController.getCommandById);

// Update a Command by ID
router.put('/command/:id', commandController.updateCommand);

// Delete a Command by ID
router.delete('/command/:id', commandController.deleteCommand);

export default router;
