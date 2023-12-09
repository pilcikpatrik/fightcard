import { Schema } from "mongoose";

import { IUser } from "@/database/user.model";

export interface CreateCardParams {
  title: string;
  fighters: { title: string; imgSrc: string }[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetCardByIdParams {
  userId: string;
}

export interface EditCardParams {
  cardId: string;
  title: string;
  fighters: { title: string; imgSrc: string }[];
  path: string;
}

export interface DeleteCardParams {
  cardId: string;
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}
