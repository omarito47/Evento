import mongoose from 'mongoose'; // Importation de mongoose
const { Schema, model } = mongoose; // Déstructuration de Schema et model à partir de mongoose


// Définition du schéma pour le modèle Evenement
const EvenementSchema = new Schema(
    {
        name: {
            type: String,
            required: true 
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
            required: true 
        },
        lieu: {
            type: String,
            required: true 
        },

        PriceTicket: {
            type: Number,
            required: true

        },
        typeEvent: {
            type: Schema.Types.ObjectId,
            ref: "typeEvent",


        },
        nombreParticipant: {
            type: Number,
            default: 0,
           
        },
        nombreDePlace: {
            type: Number,
            default: 0,
           
        },

        categorie: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: false
        },
        userEvenement: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }

    },

    {
        timestamps: true 
    }
);

// Exportation du modèle Evenement
export default model("Evenement", EvenementSchema);
