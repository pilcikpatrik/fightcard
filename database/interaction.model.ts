import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // refence to user
  action: string;
  card: Schema.Types.ObjectId; // reference to question
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  card: { type: Schema.Types.ObjectId, ref: "Card" },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
