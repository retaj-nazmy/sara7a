import mongoose, { Schema, Types } from "mongoose";

const messageSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    recieverId: {
      type: Types.ObjectId,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const messageModel = mongoose.model("message", messageSchema);
