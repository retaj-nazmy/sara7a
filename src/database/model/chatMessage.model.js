import { model, Schema, Types } from "mongoose";

const chatMessageModel = new Schema(
  {
    conversationId: {
      type: Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    senderId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  },
);

export const chatMessageSchema = model("chatMessage", chatMessageModel);
