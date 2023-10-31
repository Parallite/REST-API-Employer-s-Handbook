export default class EmployeeDto {
    _id;
    firstName;
    lastName;
    room;
    department;
    telephone;
    position;
    avatar;
    userId;

    constructor(model) {
        this._id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.room = model.room;
        this.department = model.department;
        this.telephone = model.telephone;
        this.position = model.position;
        this.avatar = model.avatar;
        this.userId = model.userId;
    }
}