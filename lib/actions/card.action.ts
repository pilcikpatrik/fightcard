"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Card from "@/database/card.model";
import { CreateCardParams, GetCardByIdParams } from "./shared.types";
import User from "@/database/user.model";

export async function getCardById(params: GetCardByIdParams) {
  try {
    connectToDatabase();

    const { cardId } = params;

    const card = await Card.findById(cardId).populate({
      path: "author",
      model: User,
      select: "_id clerkId name picture",
    });

    return card;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCard(params: CreateCardParams) {
  try {
    connectToDatabase();

    const { title, fighters, author, path } = params;

    // Odfiltrování null hodnot z fighters
    const filteredFighters = fighters.filter((fighter) => fighter !== null);

    await Card.create({
      title,
      fighters: filteredFighters,
      author,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
