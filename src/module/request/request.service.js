import { BadRequestException, statusEnum } from "../../common/index.js";
import { conversationSchema } from "../../database/model/conversation.model.js";
import { messageModel } from "../../database/model/message.model.js";
import { requestModel } from "../../database/model/Request.model.js";

export const createRequest = async (params, user) => {
  let { messageId } = params;
  const message = await messageModel.findById(messageId);

  if (!message) {
    throw BadRequestException({ message: "message not found" });
  }

  if (message.receiverId.toString() !== user.id.toString()) {
    throw BadRequestException({
      message: "you are not allowed to request this sender's identity",
    });
  }

  if (!message.isAnonymous) {
    throw BadRequestException({ message: "this message is not anonymous" });
  }

  const existingRequest = await requestModel.findOne({
    messageId,
    requesterId: user.id,
  });

  if (existingRequest) {
    throw BadRequestException({
      message: "you have already requested this sender's identity",
    });
  }

  const request = await requestModel.create({
    messageId,
    requesterId: user.id,
    ownerId: message.senderId,
    status: statusEnum.pending,
  });

  return {
    message: "request created successfully",
    _id: request._id,
    status: request.status,
  };
};

export const getMyRequests = async (user) => {
  const requests = await requestModel
    .find({ ownerId: user.id })
    .populate({
      path: "requesterId",
      select: "userName uniqueName profileImage",
    })
    .populate({ path: "messageId", select: "content image " });

  if (requests.length == 0) {
    throw BadRequestException({ message: "no requests found" });
  }
  return requests;
};

export const updateRequestStatus = async (params, body, user) => {
  const { requestId } = params;
  const { status } = body;

  if (![statusEnum.accepted, statusEnum.rejected].includes(status)) {
    throw BadRequestException({
      message: "status must be accepted or rejected",
    });
  }

  const request = await requestModel.findById(requestId);

  if (!request) {
    throw BadRequestException({ message: "request not found" });
  }

  if (request.ownerId.toString() !== user.id.toString()) {
    throw BadRequestException({
      message: "you are not allowed to update this request",
    });
  }

  request.status = status;
  await request.save();

  let conversation = null;

  if (status === statusEnum.accepted) {
    conversation = await conversationSchema.findOneAndUpdate(
      { requestId: request._id },
      {
        $setOnInsert: {
          participants: [request.requesterId, request.ownerId],
          originalMessageId: request.messageId,
          requestId: request._id,
        },
      },
      { new: true, upsert: true },
    );
  }

  return {
    message:
      status === statusEnum.accepted
        ? "identity request accepted successfully"
        : "identity request rejected successfully",
    request: {
      _id: request._id,
      messageId: request.messageId,
      status: request.status,
    },
    
    conversation: conversation
      ? {
          _id: conversation._id,
          participants: conversation.participants,
          originalMessageId: conversation.originalMessageId,
        }
      : null,
  };
};

export const getAcceptedRequests = async (user) => {
  const requests = await requestModel
    .find({
      requesterId: user.id,
      status: statusEnum.accepted,
    })
    .populate({
      path: "ownerId",
      select: "userName uniqueName profileImage",
    })
    .populate({
      path: "messageId",
      select: "content image createdAt",
    });

  return requests;
};
