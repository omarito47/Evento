
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reservationSalleSchema = new Schema({
    
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    tarif: {
        type: Number,
        required: true
    },
    idSalle: {
        type: Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    idUser: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
}
,
{
    timestamps: true
} );

export default model('ReservationSalle', reservationSalleSchema);
