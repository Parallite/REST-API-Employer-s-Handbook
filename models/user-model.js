import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        default: ''
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
    about: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    employeesId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        },
    ]
}, {
    timestamps: true,
});

export const User = model("User", UserSchema, "User")