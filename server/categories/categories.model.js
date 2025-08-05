import * as fs from "fs/promises";
const CATEGORIES_FILE = "./categories/categories.json";

// Read categories.json file & Return all categories from file
export async function getCategories() {
  let categoriesTxt = await fs.readFile(CATEGORIES_FILE);
  let categories = JSON.parse(categoriesTxt);
  return categories;
}
