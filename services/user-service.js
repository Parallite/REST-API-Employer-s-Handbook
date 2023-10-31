import bcrypt from 'bcrypt'
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import { User } from '../models/user-model.js';
import { ApiError } from '../exceptions/api-error.js';
import { Employee } from '../models/employee-model.js';


class UserService {
    async registration(email, password, firstName, lastName) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`This email is already in use.`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hashPassword, firstName, lastName });

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }
    async login(email, password) {
        const user = await User.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Invalid Username or Password!')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid Username or Password!')
        }
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnathorizedError()
        }
        const user = await User.findById(userData._id);
        // вынести в отдельную функцию дублирующийся код
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }
    async getAllUsers() {
        const users = await User.find(
            {},
            '-password -createdAt -updatedAt -__v -field')
            .populate('employeesId', '-createdAt -updatedAt -__v -field');
        return users
    }
    async getUser(id) {
        const user = await User.findById(id).populate('employeesId');
        if (!user) {
            throw ApiError.BadRequest('Сотрудник не найден');
        }
        const userDto = new UserDto(user)
        return userDto
    }
    async getCurrentUser(refreshToken) {
        console.log(111);
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const user = await User.findById(userData._id).populate('employeesId');
        const userDto = new UserDto(user)
        return userDto
    }
    async updateUser(id, newData) {
        const existEmployee = await User.findOne({ firstName: newData.firstName, lastName: newData.lastName }, { _id: 1 });
        const existEmployeeId = existEmployee?._id.toString();
        if (existEmployee && (existEmployeeId !== id)) {
            throw ApiError.BadRequest('User with this First Name & Last Name already exists')
        }
        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true }).populate('employeesId');
        const userDto = new UserDto(updatedUser);
        return userDto
    }

    async removeUser(id, refreshToken) {
        if (!id || !refreshToken) {
            throw ApiError.BadRequest()
        }
        const removedUser = await User.findByIdAndDelete(id)
        await Employee.deleteMany({ userId: id })
        await tokenService.removeToken(refreshToken)
        return removedUser
    }
}

export default new UserService()