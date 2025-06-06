import express from 'express';
import { createUser } from '../controller/users.controller.mjs';
import { reNewToken, userLogin } from '../controller/auth.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();
router.post('/register', createUser);
router.post('/login', userLogin);
router.get('/auth/re-new-token', authUser, reNewToken);


export default router;