import { Avatar } from "../models/avatar-model.js";

class AvatarService {
    async getAllAvatars() {
        const avatars = await Avatar.find({}, '-createdAt -updatedAt -__v -field');
        return avatars
    }
    async addNewAvatar(data) {
        const existAvatarName = await Avatar.findOne({ name: data.name });
        if (existAvatarName) {
            throw ApiError.BadRequest('Аватар с таким именем уже существует')
        }
        const newAvatar = { name: data.name };
        const createdAvatar = await Avatar.create(newAvatar);
        return createdAvatar
    }
    async removeAvatar(data) {
        const removedAvatar = await Avatar.deleteOne({ name: data.name })
        return removedAvatar
    }
}

export default new AvatarService()