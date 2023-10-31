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
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

export const Employee = model("Employee", EmployeeShema, "Employee")