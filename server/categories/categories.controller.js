import * as categoriesModel from "./categories.model.js";

// Get all categories
export async function getCategories(req, res) {
  try {
    let categories = await categoriesModel.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
