import jwt from 'jsonwebtoken'
import { Token } from '../models/token-model.js'

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30m' });
        return {
            accessToken,
            refreshToken
        }
    }
    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (err) {
            return null
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData
        } catch (err) {
            return null
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ user: userId, refreshToken })
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({ refreshToken })
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }

}

export default new TokenService()