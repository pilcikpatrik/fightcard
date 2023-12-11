"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Card from "@/database/card.model";
import {
  CreateCardParams,
  GetCardByIdParams,
  DeleteCardParams,
  EditCardParams,
  GetUserCardsParams,
} from "./shared.types";
import User from "@/database/user.model";

export async function getSavedCards(params: GetUserCardsParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    // Najde uživatele
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // Získá pole ID karet z uživatele
    const savedCardIds = user.saved;

    // Provede dotaz na získání specifických informací o kartách
    const savedCards = await Card.find({
      _id: { $in: savedCardIds },
    }).select("_id title createdAt");

    return savedCards;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
    await connectToDatabase();

    const { title, fighters, author, path } = params;
    const filteredFighters = fighters.filter((fighter) => fighter !== null);

    // Vytvoření karty
    const newCard = await Card.create({
      title,
      fighters: filteredFighters,
      author,
    });

    // Aktualizace uživatelského modelu
    await User.findByIdAndUpdate(author, {
      $push: { saved: newCard._id },
    });

    await revalidatePath(path);
  } catch (error) {
    console.error(error);
    // Zde můžete přidat další zpracování chyb
  }
}

export async function deleteCard(params: DeleteCardParams) {
  try {
    await connectToDatabase();

    const { cardId, path } = params;

    // Nejprve získáme kartu, abychom zjistili, kdo je autorem
    const card = await Card.findById(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    // Smazání karty
    await Card.deleteOne({ _id: cardId });

    // Odstranění ID karty z pole 'saved' uživatele
    await User.findByIdAndUpdate(card.author, {
      $pull: { saved: cardId },
    });

    await revalidatePath(path);
  } catch (error) {
    console.log(error);
    // Zde můžete přidat další zpracování chyb
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
