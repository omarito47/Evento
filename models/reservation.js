import mongoose from 'mongoose'; // Importation de mongoose
import { Schema, model } from "mongoose"; // Importation de Schema et model depuis mongoose


const reservationSchema = new Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    evenement_id: {
      type: Schema.Types.ObjectId,
      ref: 'Evenement',
      required: true
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
    timestamps: true
  }
);


const Reservation = mongoose.model('reservation', reservationSchema);

export default Reservation;