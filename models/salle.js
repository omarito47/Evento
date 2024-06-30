import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 


const salleSchema = new Schema(
    {
        nomSalle: {
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
        prix: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        // etat: {
        //     type: Boolean,
        //     default:true // disponible
        // },
        typeSalle: {
            type: Schema.Types.ObjectId,
            ref:'TypeSalle',
            required: true
        },
        
        reservations: [{
            type: Schema.Types.ObjectId,
            ref: 'ReservationSalle',
            default: []

        }],
        
        ratings: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating',
        }]
    },
    
);


export default model("Salle", salleSchema);