import express from 'express';
import UserController from "../controllers/user-controller.js"
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware.js'

const router = express.Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/current', authMiddleware, UserController.current);
router.get('/users', authMiddleware, UserController.getAllUsers);

export default router;
