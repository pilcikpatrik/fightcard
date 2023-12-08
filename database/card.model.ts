import { Schema, models, model, Document } from "mongoose";

export interface ICard extends Document {
  title: string;
  fighters: {
    title: string;
    score: string;
    imgSrc: string;
  }[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const CardSchema = new Schema({
  title: { type: String, required: true },
  fighters: [
    {
      title: String,
      score: String,
      imgSrc: String,
    },
  ],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Card = models.Card || model("Card", CardSchema);

export default Card;
