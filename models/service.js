import { Schema, model } from "mongoose";
import Reclamation from "./reclamation.js";

const serviceSchema = new Schema({
    libelle: {
        type: String,
        required: true
    }
}
);



export default model("Service", serviceSchema);