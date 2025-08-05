import express from "express";
import { getProducts, getProductId, getProductsByCategory } from "./products.controller.js";

export const productRouter = express.Router();

// Middleware specific to this route
productRouter.use(express.json());

// Route handlers
productRouter.get("/products", getProducts);
productRouter.get("/products/:product_id", getProductId);
productRouter.get("/products/:categoryType/:categoryValue", getProductsByCategory);
