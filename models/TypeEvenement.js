import { body } from 'express-validator';
import { Schema, model } from "mongoose"; // Importation de Schema et model depuis mongoose

const TypeEvenementSchema = new Schema(
    {
        name: {
            type: String,
            required: true // Le nom est requis
        },
        libele: {
            type: String,
            required: true // Le libellé est requis
        },
        

        },

);
TypeEvenementSchema.pre('remove', function(next) {
    // `this` est l'instance de TypeEvenement
    Evenement.deleteMany({ typeEvent: this._id })
        .then(() => next())
        .catch(err => next(err));
});
// Exportation du modèle TypeEvenement
export default model("TypeEvenement", TypeEvenementSchema);
