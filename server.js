require("dotenv").config();
const PORT = process.env.PORT || 8000;
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const express = require("express");
const bcrypt = require("bcrypt");

//middleware
const app = express();
app.use(express.json()); //parses json coming in the request body

//routes
const signInRoute=require("./routes/signin")
const signUpRoute=require("./routes/signup")
const usersRoute=require("./routes/users")
app.use("/signin",signInRoute);
app.use("/signup",signUpRoute);
app.use("/users",usersRoute)

//db Connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (req, res) => {
      console.log(`Server listening on ${PORT}`);
    });
    db = getDb();
  }
});

//Authentication

//signup

module.exports={db}

