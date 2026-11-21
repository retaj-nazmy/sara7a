import { fi } from "zod/locales";
import { BadRequestException } from "../../common/index.js";
import { messageModel } from "../../database/model/message.model.js";
import { userModel } from "../../database/model/user.model.js";

export const getAllMessages = async () => {
  let messages = await messageModel.find();
  if (messages.length == 0) {
    throw BadRequestException({ message: "np messages found" });
  } else {
    return { messages };
  }
};



export const sendMessage = async (body, file, user) => {
  let { content, receiverId } = body;
  let image;

  let existUser = await userModel.findById(receiverId);

  if (!existUser) {
    throw BadRequestException({ message: "user not found" });
  }

  if (user.id == receiverId) {
    throw BadRequestException({
      message: "you can't send message to yourself",
    });
  }

  if (file) {
    image = file.path;
  }

  let message = await messageModel.create({
    content,
    receiverId,
    image,
    senderId: user.id,
    isAnonymous:true
  });

  if (!message) {
    throw BadRequestException({ message: "message not send" });
  }

  return message;
};

export const getUserURL = async (user) => {
  let userData = await userModel.findById(user.id);
  if (!userData) {
    throw BadRequestException({ message: "user not found" });
  }
  const url = `https://sara7a/${userData.uniqueName}`;
  return url;
};




export const getUserData = async (body) => {
  let { url } = body;
  let uniqueName = url.split("/").at(-1);
  let userData = await userModel.findOne({ uniqueName }).select("-password -createdAt -updatedAt");
  if (!userData) {
    throw BadRequestException({ message: "user not found" });
  }
  return userData;
};


export const getUserMessages = async (user) => {
  let messages = await messageModel.find({ receiverId: user.id }).select('-senderId');
  if (messages.length == 0) {
    throw BadRequestException({ message: "no messages found" });
  }
  return messages;
};
