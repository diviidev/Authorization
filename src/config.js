const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Makes 'name' field mandatory
  },
  password: {
    type: String,
    required: true, // Makes 'password' field mandatory
  },
});

const collection = mongoose.model("users", LoginSchema);

// Export the collection/model
module.exports = collection;
