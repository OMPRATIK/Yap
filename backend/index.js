import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/connect.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import notFoundMiddleware from "./middlewares/notFoud.middleware.js";

import { app, server } from "./socket.js";

const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", messageRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
