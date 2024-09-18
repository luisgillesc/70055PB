import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/UserController.js';

const router = Router();

// Registro
router.post('/register', UserController.register);

// Login
router.post('/login', UserController.login);

// Ruta protegida
router.get('/protected', passport.authenticate('jwt', { session: false }), UserController.protectedRoute);

export default router;
