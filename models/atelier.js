
import { Schema, model } from "mongoose";

const atelierSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    lieu: {
        type: String,
        required: true
    },

    date_debut: {
        type: Date ,
        
        required: true
    }, 
    date_fin: {
        type: Date ,
        
        required: true
    }, 
    Nbr_place: {
        type:Number,
        required: true
    }, 
    frequence_de_repetition: {
        type:Number,
        required: true
    },
    typeAtelier: {
        type: Schema.Types.ObjectId,
        ref:'Categorie',
        required: true
    },

    prix: {
        type:Number,
        required: true
    },   
    
},
    {
        timestamps: true
    }
);

export default model("Atelier", atelierSchema);
