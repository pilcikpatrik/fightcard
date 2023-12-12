"use server";

import Card from "@/database/card.model";
import { connectToDatabase } from "../mongoose";
import { ViewCardParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewCard(params: ViewCardParams) {
  try {
    await connectToDatabase();

    const { cardId, userId } = params;

    // Update view count for the question
    await Card.findByIdAndUpdate(cardId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        card: cardId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        card: cardId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
