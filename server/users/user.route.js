import express from "express";
import { postUser, getUser } from "./users.controller.js";

export const userRouter = express.Router();

// Middleware specific to this route
userRouter.use(express.json());

// Route handlers
userRouter.post("/users", postUser);
userRouter.get("/users/:username", getUser);
