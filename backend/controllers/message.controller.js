import { StatusCodes } from "http-status-codes";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudianry from "../utils/cloudinary.util.js";
import { getRecieverSocketId, io } from "../socket.js";

export const getUsers = async (req, res) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  })
    .select("-password")
    .sort({ updatedAt: -1 });

  res.status(StatusCodes.OK).json(filteredUsers);
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const loggedInUserId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: loggedInUserId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: loggedInUserId },
    ],
  });

  res.status(StatusCodes.OK).json(messages);
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  let imageUrl;
  if (image) {
    const uploadedResponse = await cloudianry.uploader.upload(image);
    imageUrl = uploadedResponse.secure_url;
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  const receiverSocketId = getRecieverSocketId(receiverId);
  const senderSocketId = getRecieverSocketId(senderId);

  if (receiverSocketId && senderSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
    io.to(senderSocketId).emit("newMessage", newMessage);
  }

  res.status(StatusCodes.CREATED).json(newMessage);
};
