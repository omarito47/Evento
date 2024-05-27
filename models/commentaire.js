import { Schema, model } from "mongoose";

const commentaireSchema = new Schema({
    reclamationComment: {
        type: Schema.Types.ObjectId,
        ref:'Reclamation',
        required:true
    },
    usercomment: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    description: {
        type: String,
        required:true
    },
    selection: {
        type: Boolean,
        default:false
    }, 
},
    {
        timestamps: true
    }
);

export default model("Commentaire", commentaireSchema);