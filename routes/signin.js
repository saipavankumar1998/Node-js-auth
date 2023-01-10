const express = require("express");
const db = require("../server");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };


  try {
    const dbUser = await db.collection("users")
      .findOne({ "username": user.username });

    if (user.username == dbUser.username) {
      const isValidPassword = await bcrypt.compare(user.password, dbUser.password)
        (isValidPassword) ? res.json({ msg: "Authenticated user. Successfully logged In" }) : res.status(400).json({ message: "Wrong Password" })
    } else res.json({ msg: "Username not found in the DB" })

  } catch (error) {
    res.status(500).json({ error: "Error while finding the user" })
  }
});

module.exports = router