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
    status: {
        type: Boolean ,
        default:true,
    }, 
    etat: {
        type: Boolean ,
        default:false,
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
    },
    typeReclamation: {
        type: Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    userReclamation: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
},
    {
        timestamps: true
    }
);

export default model("Reclamation", reclamationSchema);