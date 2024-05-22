import { Schema, model } from "mongoose";

const reclamationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    etat: {
        type: Boolean ,
        default:false,
        required: true
    }, 
    email: {
        type:String,
        required: true
    }, 
    numTelReclamation: {
        type:String,
        required: true
    }, 
    pieceJointe: {
        type: String,
        required: true
    },
    typeReclamation: {
        type: Schema.Types.ObjectId,
        ref:'Service',
        required: true
    },
    
},
    {
        timestamps: true
    }
);

export default model("Reclamation", reclamationSchema);