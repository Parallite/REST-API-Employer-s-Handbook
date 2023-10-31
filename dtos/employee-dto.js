export default class EmployeeDto {
    id;
    firstName;
    lastName;
    userId;

    constructor(model) {
        this.id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.userId = model.userId;
    }
}