import { Schema, models, model, Document } from "mongoose";

export interface IFighter extends Document {
  title: string;
  imgSrc: string;
}

const FighterSchema = new Schema({
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const Fighter = models.Fighter || model("Fighter", FighterSchema);

export default Fighter;
