const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 5000;

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("login");
});

app.use(express.static("public"));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    // If user exists, send a message
    return res.send("User already exists. Please choose a different username.");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany([data]);
    console.log(userdata);
  }
});

app.post("/login", async (req, res) => {
  const user = await collection.findOne({ name: req.body.username });

  if (!user) {
    return res.send("User not found.");
  }

  // Compare the hash password from the database with the plain text
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordMatch) {
    res.render("home"); // Render the home page if password matches
  } else {
    res.send("Wrong password."); // Send message if password does not match
  }
});

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
