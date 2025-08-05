import express from "express";
import { postProduct, getBasket, postBasket, updateBasketItem, DeleteBasketItem } from "./baskets.controller.js";

export const basketRouter = express.Router();

// Middleware specific to this route
basketRouter.use(express.json());

// Route handlers
basketRouter.post("/baskets/:username/products", postProduct);
basketRouter.get("/baskets/:username/products", getBasket);
basketRouter.post("/baskets/:username", postBasket);
basketRouter.put("/baskets/:username/products/:product_id", updateBasketItem);
basketRouter.delete("/baskets/:username/products/:product_id", DeleteBasketItem);
