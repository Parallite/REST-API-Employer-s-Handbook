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
    name: {
        type: String,
        required: true,
        unique: true
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