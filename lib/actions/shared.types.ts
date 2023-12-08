import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface CreateCardParams {
  title: string;
  fighters: { title: string; imgSrc: string }[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetCardByIdParams {
  cardId: string;
}
