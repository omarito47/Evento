import { Schema, model } from "mongoose";

const commentaireSchema = new Schema({
    reclamationComment: {
        type: Schema.Types.ObjectId,
        ref:'Reclamation',
    },
    usercomment: {
        type: Schema.Types.ObjectId,
        ref:'User',
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