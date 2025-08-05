import * as userModel from "./users.model.js";

// Create a new user
export async function postUser(req, res) {
  try {
    let newUser = req.body;
    await userModel.add(newUser);
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// Get information about a user
export async function getUser(req, res) {
  try {
    let username = req.params.username;
    let user = await userModel.getByID(username);
    res.json(user);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
