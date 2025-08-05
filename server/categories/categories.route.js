import express from "express";
import { getCategories } from "./categories.controller.js";

export const categoriesRouter = express.Router();

// Middleware specific to this route
categoriesRouter.use(express.json());

// Route handlers
categoriesRouter.get("/categories", getCategories);
