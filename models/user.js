import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        password: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: Number,
        default: null,
        required: false
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

export default model("User", userSchema);