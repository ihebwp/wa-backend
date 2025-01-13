// routes/userRoutes.js
import express from 'express';
import * as UserController from '../Controllers/userController.js';

const router = express.Router();

// Signup
router.post('/signup', UserController.signup);

// Login
router.post('/login', UserController.login);

// Logout
router.post('/logout', UserController.logout);

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
