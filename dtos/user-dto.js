export default class UserDto {
    _id;
    email;
    firstName;
    lastName;
    room;
    department;
    telephone;
    about;
    position;
    avatar;
    employeesId;

    constructor(model) {
        this._id = model._id;
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.room = model.room;
        this.department = model.department;
        this.telephone = model.telephone;
        this.about = model.about;
        this.position = model.position;
        this.avatar = model.avatar;
        this.employeesId = model.employeesId
    }
}