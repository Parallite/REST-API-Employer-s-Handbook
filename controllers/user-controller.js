import UserService from '../services/user-service.js'
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class UserController {
    /**
     * @route POST /api/user/registration
     * @desc  Registration
     * @access Public
     */
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { email, password, name } = req.body;
            const userData = await UserService.registration(email, password, name);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route POST /api/user/login
     * @desc Login
     * @access Public
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route POST /api/user/logout
     * @desc Logout
     * @access Public
     */
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken')
            res.status(200).json(token)
        } catch (error) {
            next(err)
        }
    }
    /**
     * @route GET /api/user/refresh
     * @desc Logout
     * @access Public
     */
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route GET /api/user/current
     * @desc  get current user
     * @access Private
     */
    async current(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user = await UserService.getCurrentUser(refreshToken);
            return res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route GET /api/users
     * @desc  get all users
     * @access Private
     */
    async getAllUsers(_, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }
}


export default new UserController()