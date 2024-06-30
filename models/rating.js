import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ratingSchema = new Schema(
    
    {
            idUser: {
                type: Schema.Types.ObjectId,
                ref: 'User', 
                required: true
            },
            idSalle: {
                type: Schema.Types.ObjectId,
                ref: 'Salle', 
                required: true
            },
            ratingValue: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
    }
);

export default model("Rating", ratingSchema);
