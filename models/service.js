import { Schema, model } from "mongoose";


const serviceSchema = new Schema({
    libelle: {
        type: String,
        required: true,
        unique:true
    }
}
);



export default model("Service", serviceSchema);