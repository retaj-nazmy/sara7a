import { model, Schema, Types } from "mongoose";

const conversationModel = new Schema(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    originalMessageId: {
      type: Types.ObjectId,
      ref: "message",
      required: true,
    },
    requestId: {
      type: Types.ObjectId,
      ref: "request",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const conversationSchema = model("conversation", conversationModel);