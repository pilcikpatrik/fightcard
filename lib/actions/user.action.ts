import User from "@/database/user.model";
import Card from "@/database/card.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  GetUserByIdParams,
  GetUserStatsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Card.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalCards = await Card.countDocuments({ author: user._id });

    const [cardUpvotes] = await Card.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [cardViews] = await Card.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "CARD_COUNT", count: totalCards },
      { type: "CARD_UPVOTES", count: cardUpvotes?.totalUpvotes || 0 },
      { type: "TOTAL_VIEWS", count: cardViews?.totalViews || 0 },
    ];

    const badgeCounts = criteria;

    return {
      user,
      totalCards,
      badgeCounts,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserCards(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalCards = await Card.countDocuments({ author: userId });

    const userCards = await Card.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("_id title")
      .populate("author", "_id clerkId name picture");

    const isNextCards = totalCards > skipAmount + userCards.length;

    return { totalCards, cards: userCards, isNextCards };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
