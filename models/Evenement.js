import mongoose from 'mongoose'; // Importation de mongoose
const { Schema, model } = mongoose; // Déstructuration de Schema et model à partir de mongoose
import TypeEvenement from "./TypeEvenement.js";


// Définition du schéma pour le modèle Evenement
const EvenementSchema = new Schema(
    {
        name: {
            type: String,
            required: true // Le nom est requis
        },
        description: {
            type: String,
            required: true // La description est requise
        },
        DateDebut: {
            type: Date,
            required: true // La date de début est requise
        },
        DateFin: {
            type: Date,
            required: true // La date de fin est requise
        },
        heure: {
            type: String,
            required: true // L'heure est requise
        },
        lieu: {
            type: String,
            required: true // Le lieu est requis
        },
        NbreDePlace: {
            type: Number,
            required: true // Le nombre de places est requis
        },
        PriceTicket: {
            type: Number,
            required: true // Le prix du billet est requis
        },
        typeTypeEvenement : {
            type: Schema.Types.ObjectId,
            ref:'Evenement',
            required: true
        },
        
    },
    
    {
        timestamps: true // Ajoute les champs createdAt et updatedAt automatiquement
    }
);

// Exportation du modèle Evenement
export default model("Evenement", EvenementSchema);
