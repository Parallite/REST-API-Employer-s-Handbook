import { ApiError } from '../exceptions/api-error.js';
import tokenService from '../services/token-service.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError())
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.UnathorizedError())
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnathorizedError())
        }
        req.user = userData;
        next();
    } catch (err) {
        return next(ApiError.UnathorizedError())
    }
}