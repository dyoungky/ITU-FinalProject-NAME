import * as fs from "fs/promises";
const BASKETS_FILE = "./baskets/baskets.json";

// Return all baskets from file
export async function getAll() {
  try {
    let basketsTxt = await fs.readFile(BASKETS_FILE);
    let basketsArray = JSON.parse(basketsTxt);
    return basketsArray;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// Save array of baskets to file
async function save(basket) {
  let basketsTxt = JSON.stringify(basket);
  await fs.writeFile(BASKETS_FILE, basketsTxt);
}

// Get a basket by username
export async function getByUsername(username) {
  let basketsArray = await getAll();
  let index = findBasketByUserID(basketsArray, username);
  if (index === -1) throw new Error(`Basket for user ${username} doesn't exist`);
  else return basketsArray[index];
}

// Add a product to the basket
export async function add(newBasketProduct, username) {
  // Get the basket array and the specific basket through its index
  let basketsArray = await getAll();
  let basketIndex = findBasketByUserID(basketsArray, username);

  // If the basket can't be found, throw an error
  if (basketIndex === -1) {
    throw new Error(`Basket for user ${username} doesn't exist`);
  }

  let basket = basketsArray[basketIndex];

  // Check if the product already exists in the basket, then either update the amount or add it
  let existingProductIndex = basket.products.findIndex((product) => 
    product.product_id === newBasketProduct.product_id && product.size === newBasketProduct.size
  );

  if (existingProductIndex !== -1) {
    // update the amount
    let existingProduct = basket.products[existingProductIndex];
    let newAmount = existingProduct.amount + 1;
    updateProductQuantity(username, newBasketProduct.product_id, newAmount, newBasketProduct.size)

  } else {
    basket.products.push(newBasketProduct);
    await save(basketsArray);
  }
}

// Find the basket of a specific user
function findBasketByUserID(basketsArray, username) {
  let basketIndex = basketsArray.findIndex((currBasket) => currBasket.username === username);

  return basketIndex;
}

// Add a basket for a specific user
export async function addBasket(newBasket, username) {
  let basketsArray = await getAll();
  let basketIndex = findBasketByUserID(basketsArray, username);

  if (basketIndex !== -1) throw new Error(`Basket of user: ${username} already exists`);
  newBasket.username = username;
  basketsArray.push(newBasket);
  await save(basketsArray);
}

// Update the quantity of a certain product in a basket according to the amount given
export async function updateProductQuantity(username, product_id, newAmount, size) {
  let basketsArray = await getAll();
  let basketIndex = findBasketByUserID(basketsArray, username);

  if (basketIndex === -1) {
    throw new Error(`Basket for user ${username} doesn't exist`);
  }

  let basket = basketsArray[basketIndex];
  let productIndex = basket.products.findIndex((product) => product.product_id === product_id && product.size === size);

  if (productIndex === -1) {
    throw new Error(`Product with ID:${product_id} doesn't exist in the basket`);
  }

  if (newAmount > 0) {
    basket.products[productIndex].amount = newAmount;
  }

  await save(basketsArray);
}

// Remove a product from a basket based on the product id
export async function removeProduct(username, product_id, size) {
  let basketsArray = await getAll();
  let basketIndex = findBasketByUserID(basketsArray, username);

  if (basketIndex === -1) {
    throw new Error(`Basket for user ${username} doesn't exist`);
  }
  
  let basket = basketsArray[basketIndex];
  let productIndex = basket.products.findIndex((product) =>
    product.product_id === product_id && product.size === size
);

  if (productIndex === -1) {
    throw new Error(`Product with ID:${product_id} doesn't exist in the basket`);
  }

  basket.products.splice(productIndex, 1);

  await save(basketsArray);
}
