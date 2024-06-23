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
    },
    password: {
        type: String,
        required: true,
        password: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
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
      phoneNumber: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
      },
      token: {
        type: String,
        default: null,
        required: false
      },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'ReservationSalle'
    }],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }]
});

export default model("User", userSchema);