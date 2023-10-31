import express from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js'
import avatarController from '../controllers/avatar-controller.js';

const router = express.Router();

// /api/avatars
router.get('/all', authMiddleware, avatarController.getAllAvatars);
router.post('/add', authMiddleware, avatarController.addNewAvatar);

export default router;
