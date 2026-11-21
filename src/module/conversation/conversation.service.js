import { BadRequestException } from "../../common/index.js";
import { chatMessageSchema } from "../../database/model/chatMessage.model.js";
import { conversationSchema } from "../../database/model/conversation.model.js";

export const sendMessage = async (params, body, user) => {
  const { conversationId } = params;
  const { content } = body;

  if (!content || !content.trim()) {
    throw BadRequestException({ message: "message content is required" });
  }

  const conversation = await conversationSchema.findById(conversationId);

  if (!conversation) {
    throw BadRequestException({ message: "conversation not found" });
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === user.id.toString(),
  );

  if (!isParticipant) {
    throw BadRequestException({
      message: "you are not allowed to send messages in this conversation",
    });
  }

  const chatMessage = await chatMessageSchema.create({
    conversationId,
    senderId: user.id,
    content: content.trim(),
  });

  return { message: "message sent successfully", chatMessage };
};

export const getConversationMessages = async (params, user) => {
  const { conversationId } = params;

  const conversation = await conversationSchema.findById(conversationId);

  if (!conversation) {
    throw BadRequestException({ message: "conversation not found" });
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === user.id.toString(),
  );

  if (!isParticipant) {
    throw BadRequestException({
      message: "you are not allowed to access this conversation",
    });
  }

  const messages = await chatMessageSchema
    .find({ conversationId })
    .populate({
      path: "senderId",
      select: "userName uniqueName profileImage",
    })
    .sort({ createdAt: 1 });

  return {
    message: "conversation messages retrieved successfully",
    messages,
  };
};
