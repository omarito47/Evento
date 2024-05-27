
import { Schema, model } from "mongoose";
import Atelier from "./atelier.js";

const categorieSchema = new Schema({
    nom_categorie: {
        type: String,
        required: true
    }
}
);



export default model("Categorie", categorieSchema);
