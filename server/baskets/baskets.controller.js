import * as basketModel from "./baskets.model.js";

// Add product to a specific basket
export async function postProduct(req, res) {
  try {
    let newBasketProduct = req.body;
    let username = req.params.username;
    console.log(`Received request to add product to basket for user: ${username}`, newBasketProduct);

    await basketModel.add(newBasketProduct, username);

    console.log('Product added to basket successfully');


    res.json({ success: true, product: newBasketProduct });
  } catch (error) {
    console.error('Error adding product to basket:', error.message);


    res.status(400).json({ error: error.message });
  }
}


// Get information about basket contents
export async function getBasket(req, res) {
  try {
    let username = req.params.username;
    let basket_content = await basketModel.getByUsername(username);
    res.json(basket_content);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// Create a new basket for a user
export async function postBasket(req, res) {
  try {
    let newBasket = req.body;
    let username = req.params.username;
    await basketModel.addBasket(newBasket, username);
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// Update item according to amount
export async function updateBasketItem(req, res) {
  try {
    let username = req.params.username;
    let product_id = parseInt(req.params.product_id);
    let newAmount = parseInt(req.body.amount);
    let size = req.body.size;

    await basketModel.updateProductQuantity(username, product_id, newAmount, size);
    res.send(`Product ${product_id} updated in basket of user ${username}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// Delete product from basket
export async function DeleteBasketItem(req, res) {
  try {
    let username = req.params.username;
    let product_id = parseInt(req.params.product_id);
    let size = req.body.size;

    await basketModel.removeProduct(username, product_id, size);
    res.send(`Product ${product_id} removed from basket of user ${username}`);
  } catch (error) {
    res.status(404).send(error.message);
  }
}
