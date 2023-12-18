import { Schema, models, model, Document } from "mongoose";

interface stats {
  label: string;
  value: string;
}

export interface ICard extends Document {
  title: string;
  description: string;
  fighters: {
    title: string;
    nickname: string;
    imgSrc: string;
    score: string;
    nationality: string;
    age: string;
    height: string;
    weight: string;
    background: string;
    gym: string;
    result: string[];
    stats: stats[];
  }[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  isVisible: boolean;
  createdAt: Date;
}

const CardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  fighters: [
    {
      title: String,
      nickname: String,
      imgSrc: String,
      score: String,
      nationality: String,
      age: String,
      height: String,
      weight: String,
      background: String,
      gym: String,
      result: [String],
      stats: [
        {
          label: String,
          value: String,
        },
      ],
    },
  ],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  isVisible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Card = models.Card || model("Card", CardSchema);

export default Card;
