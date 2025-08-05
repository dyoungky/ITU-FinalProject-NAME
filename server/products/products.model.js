import * as fs from "fs/promises";
const PRODUCTS_FILE = "./products/products.json";

// Read products.json file & Return all products from file
export async function getProducts() {
  let productsTxt = await fs.readFile(PRODUCTS_FILE);
  let products = JSON.parse(productsTxt);
  return products;
}

// Get a specific product using product_id
export async function getProductId(product_id) {
  let products = await getProducts();
  const product = products.find((el) => el.product_id === product_id);
  return product;
}

// Get products by category
export async function getProductsByCategory(category) {
  let products = await getProducts();

  const filteredProducts = products.filter((product) => {
    return (
      (category.type ? product.type.toLowerCase() === category.type.toLowerCase() : true) &&
      (category.color ? product.color.toLowerCase() === category.color.toLowerCase() : true) &&
      (category.gender ? product.gender.toLowerCase() === category.gender.toLowerCase() : true) &&
      (category.material ? product.materials.map((material) => material.toLowerCase()).includes(category.material.toLowerCase()) : true)
    );
  });

  return filteredProducts;
}
