import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EmployeeShema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        default: ''
    },
    telephone: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

export const Employee = model("Employee", EmployeeShema, "Employee")