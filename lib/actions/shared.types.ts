import { Schema } from "mongoose";

import { IUser } from "@/database/user.model";

export interface CreateCardParams {
  title: string;
  fighters: { title: string; imgSrc: string }[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface EditCardParams {
  cardId: string;
  title: string;
  fighters: { title: string; imgSrc: string }[];
  path: string;
}

export interface GetUserCardsParams {
  clerkId: string;
}

export interface GetCardByIdParams {
  cardId: string;
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

export interface GetCardsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface ViewCardParams {
  cardId: string;
  userId: string | undefined;
}

export interface CardVoteParams {
  cardId: string;
  userId: string;
  hasupVoted: boolean;
  path: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}
