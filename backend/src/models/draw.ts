import mongoose from "mongoose";
import { DrawType } from "../shared/types";

// Définition du schéma pour le modèle Draw
const drawSchema = new mongoose.Schema<DrawType>({
  userId: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  participationDate: { type: Date, required: true }
});

// Création et exportation du modèle Draw
const Draw = mongoose.model<DrawType>("Draw", drawSchema);
export default Draw;

