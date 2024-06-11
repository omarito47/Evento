import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const typeSalleSchema = new Schema(
    {
        libelle: {
            type: String,
            required: true
        }
    },
    
);

export default model('TypeSalle', typeSalleSchema);