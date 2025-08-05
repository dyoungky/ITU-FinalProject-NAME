import * as productModel from "./products.model.js";

// Get all products
export async function getProducts(req, res) {
  try {
    let products = await productModel.getProducts();
    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get a specific product using product_id
export async function getProductId(req, res) {
  try {
    let product_id = parseInt(req.params.product_id);
    let product = await productModel.getProductId(product_id);
    if (!product) {
      res.status(404).send("No products are found.");
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get all existing product categories
export async function getProductsByCategory(req, res) {
  try {
    const categoryType = req.params.categoryType.toLowerCase();
    const categoryValue = req.params.categoryValue.toLowerCase();

    // Construct the category object based on the category type and value
    let category = {};
    category[categoryType] = categoryValue;

    let products = await productModel.getProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
