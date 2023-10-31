import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TokenShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Token = model("Token", TokenShema, "Token")