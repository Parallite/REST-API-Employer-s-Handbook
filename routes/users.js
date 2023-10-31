import express from 'express';
import UserController from "../controllers/user-controller.js"
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware.js'

const router = express.Router();

// api/users/

router.post('/user/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration
);
router.post('/user/login', UserController.login);
router.post('/user/logout', UserController.logout);
router.get('/user/refresh', UserController.refresh);

router.get('/all', authMiddleware, UserController.getAllUsers);
router.get('/user/:id', authMiddleware, UserController.getUser);
router.get('/user/current', authMiddleware, UserController.current);
router.patch('/user/edit/:id', authMiddleware, UserController.updateUserData);
router.delete('/user/remove/:id', authMiddleware, UserController.removeUser);

export default router;
