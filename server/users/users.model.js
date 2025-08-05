import * as fs from "fs/promises";
const USERS_FILE = "./users/users.json";

// Return all users from file
export async function getAll() {
  try {
    let usersTxt = await fs.readFile(USERS_FILE);
    let users = JSON.parse(usersTxt);
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// Save the array of users to the file
async function save(users = []) {
  let usersTxt = JSON.stringify(users);
  await fs.writeFile(USERS_FILE, usersTxt);
}

// Check if username already exists
function findUser(userArray, username) {
  return userArray.findIndex((currUser) => currUser.username === username);
}

// Check if email already exists
function findUserEmail(userArray, email) {
  return userArray.findIndex((currUser) => currUser.email === email);
}

// Get information about a user by username
export async function getByID(username) {
  let userArray = await getAll();
  let index = findUser(userArray, username);
  if (index === -1) throw new Error(`User with the username: ${username} doesn't exist`);
  else return userArray[index];
}

// Create a new user
export async function add(newUser) {
  let userArray = await getAll();
  if (findUser(userArray, newUser.username) !== -1) throw new Error(`The username: ${newUser.username} already exists`);
  if (findUserEmail(userArray, newUser.email) !== -1) throw new Error(`A user with the email address: ${newUser.email} already exists`);
  userArray.push(newUser);
  await save(userArray);
}
