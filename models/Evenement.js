import mongoose from 'mongoose'; // Importation de mongoose
const { Schema, model } = mongoose; // Déstructuration de Schema et model à partir de mongoose
// import TypeEvenement from "./TypeEvenement.js";
// import Evenement from "./Evenement.js";


// Définition du schéma pour le modèle Evenement
const EvenementSchema = new Schema(
    {
        name: {
            type: String,
            required: true // Le nom est requis
        },
        description: {
            type: String,
            required: true,
        },
        DateDebut: {
            type: Date,
            required: true,

        },
        DateFin: {
            type: Date,
            required: true,
        },
        heure: {
            type: String,
            required: true // L'heure est requise
        },
        lieu: {
            type: String,
            required: true // Le lieu est requis
        },

        PriceTicket: {
            type: Number,
        },
        typeEvent: {
            type: Schema.Types.ObjectId,
            ref: "categorie" // Le prix du billet est requis
        },
        nombreParticipant: {
            type: Number,
            default: 0
        },

        image: {
            type: String,
            required: false
        },
        userEvenement: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required:true
        }

    },

    {
        timestamps: true // Ajoute les champs createdAt et updatedAt automatiquement
    }
);

// Exportation du modèle Evenement
export default model("Evenement", EvenementSchema);
