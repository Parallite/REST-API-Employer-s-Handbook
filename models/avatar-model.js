import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AvatarShema = new Schema({
    name: {
        type: String,
        unique: true
    },
}, {
    timestamps: true,
});

export const Avatar = model("Avatar", AvatarShema, "Avatar")