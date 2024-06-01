import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const participationSchema = new Schema({
    atelier: {
        type: Schema.Types.ObjectId,
        ref: 'Atelier',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
}, {
    timestamps: true
});

export default model("Participation", participationSchema);
