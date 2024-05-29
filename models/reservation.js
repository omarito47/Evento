import mongoose from 'mongoose'; // Importation de mongoose
import { Schema, model } from "mongoose"; // Importation de Schema et model depuis mongoose


const reservationSchema = new Schema(
    {
    
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    TypeRes: {
        type: Schema.Types.ObjectId,
        ref: "reserver" 
    },
    etat: {
        type: String,
        enum: ['en attente', 'confirmée', 'annulée'],
        default: 'en attente'
      }
      
},
{
    timestamps:true
}
);

export default model("reservation", reservationSchema);
