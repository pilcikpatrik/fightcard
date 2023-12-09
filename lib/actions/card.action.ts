"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Card from "@/database/card.model";
import {
  CreateCardParams,
  GetCardByIdParams,
  DeleteCardParams,
  EditCardParams,
} from "./shared.types";

export async function getCardsByUserId(params: GetCardByIdParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    // Najděte všechny karty, které mají 'author' roven 'userId'
    const cards = await Card.find({ author: userId });

    return cards;
  } catch (error) {
    console.error(error);
    return [];
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

export async function deleteCard(params: DeleteCardParams) {
  try {
    connectToDatabase();

    const { cardId, path } = params;

    await Card.deleteOne({ _id: cardId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editCard(params: EditCardParams) {
  try {
    connectToDatabase();

    const { cardId, title, fighters, path } = params;

    const card = await Card.findById(cardId);

    if (!card) {
      throw new Error("Question not found");
    }

    card.title = title;
    card.fighters = fighters;

    await card.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
