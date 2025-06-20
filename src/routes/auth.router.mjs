import express from 'express';
import { createUser } from '../controller/users.controller.mjs';
import { reNewToken, userLogin } from '../controller/auth.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

// Rutas autenticación con prefijo /api/auth
router.post('/api/auth/register', createUser); // Registrar usuario
router.post('/api/auth/login', userLogin);     // Login usuario
router.get('/api/auth/re-new-token', authUser, reNewToken); // Renovar token (requiere token válido)

export default router;