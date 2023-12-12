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
  GetCardsParams,
  CardVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

export async function getCards(params: GetCardsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Card> = { isVisible: true };

    if (searchQuery) {
      query.$or = [{ title: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      default:
        break;
    }

    const cards = await Card.find(query)
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalCards = await Card.countDocuments(query);

    const isNext = totalCards > skipAmount + cards.length;

    return { cards, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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

export async function setVisibleCard(params: { cardId: string; path: string }) {
  try {
    connectToDatabase();

    const { cardId, path } = params;

    const card = await Card.findById(cardId);

    if (!card) {
      throw new Error("Card not found");
    }

    // Set isVisible to true
    card.isVisible = true;

    await card.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error; // It's often a good practice to rethrow the error so the caller knows something went wrong
  }
}

export async function upvoteCard(params: CardVoteParams) {
  try {
    connectToDatabase();

    const { cardId, userId, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const card = await Card.findByIdAndUpdate(cardId, updateQuery, {
      new: true,
    });

    if (!card) {
      throw new Error("Card not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
