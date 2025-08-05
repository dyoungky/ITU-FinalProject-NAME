import express from "express";

import { basketRouter } from "./baskets/basket.route.js";
import { userRouter } from "./users/user.route.js";
import { productRouter } from "./products/product.route.js";
import { categoriesRouter } from "./categories/categories.route.js";

const app = express();
const PORT = 4000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by quizzesRouter
app.use(basketRouter);
app.use(userRouter);
app.use(productRouter);
app.use(categoriesRouter);

app.get("/", (req, res) => res.send("The server is live."));

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
