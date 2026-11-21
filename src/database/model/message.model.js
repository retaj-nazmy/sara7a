import mongoose, { Schema, Types } from "mongoose";

const messageSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    senderId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  },
);

export const messageModel = mongoose.model("message", messageSchema);
