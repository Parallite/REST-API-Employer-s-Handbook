import { ApiError } from '../exceptions/api-error.js';
import avatarService from '../services/avatar-service.js';

class AvatarController {
    async getAllAvatars(_, res, next) {
        try {
            const avatars = await avatarService.getAllAvatars();
            return res.status(200).json(avatars)
        } catch (err) {
            next(err)
        }
    }
    async addNewAvatar(req, res, next) {
        try {
            const data = req.body;
            const avatar = await avatarService.addNewAvatar(data);
            return res.status(201).json(avatar);
        } catch (err) {
            next(err)
        }
    }
}


export default new AvatarController()