import { body } from 'express-validator';
import { Schema, model } from "mongoose"; // Importation de Schema et model depuis mongoose
import Evenement from "./Evenement.js";
// Définition du schéma pour le modèle TypeEvenement
const TypeEvenementSchema = new Schema(
    {
        name: {
            type: String,
            required: true // Le nom est requis
        },
        libele: {
            type: String,
            required: true // Le libellé est requis
        }
    },
    
);

TypeEvenementSchema.pre('remove', async function(next) {
    console.log("hello");
    try {
        await TypeEvenement.deleteMany({TypeEvenement:this._id});
        console.log("hiiii");
        next(); 
    } catch (err) {
        next(err);
    }
});
// Exportation du modèle TypeEvenement
export default model("TypeEvenement", TypeEvenementSchema);
