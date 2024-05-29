import { body } from 'express-validator';
import { Schema, model } from "mongoose"; // Importation de Schema et model depuis mongoose
// import Evenement from "./Evenement.js";
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


// Exportation du modèle TypeEvenement
export default model("TypeEvenement", TypeEvenementSchema);
