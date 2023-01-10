const express=require("express");
const db=require("../server");
const { ObjectId } = require("mongodb");
const router=express.Router()


//GET ALL USERS
router.get("/", (req, res) => {
    let users = [];
    db.db.collection("users")
      .find()
      .forEach((user) => users.push(user))
      .then(() => res.status(200).json(users))
      .catch(() => res.status(500).json({ error: "Couldn't fetch data" }));
  });
  
  
  //GET SINGLE USER BY ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      db.db.collection("users")
        .findOne({ _id: ObjectId(id) })
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch((err) => {
          res.status(500).json({ error: "Couldn't fetch the doc" });
        });
    } else {
      res.status(500).json({ error: "ID is invalid" });
    }
  });
  
  //INSERT SINGLE USER TO THE COLLECTION
  router.post("/", (req, res) => {
    const user = req.body;
    db.collection("users")
      .insertOne(user)
      .then((result) => {
        res
          .status(200)
          .json({ result: result, message: "Sucessfuly added the user" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Couldn't add the user" });
      });
  });
  
  //DELETE SINGLE USER FROM THE COLLECTION BASED ON ID
  router.delete("/:id", (req, res) => {
    const user_id = req.params.id;
    if (ObjectId.isValid(user_id)) {
      db.db.collection("users")
        .deleteOne({ _id: ObjectId(user_id) })
        .then((result) => {
          res.status(200).json({
            result: result,
            message: "deleted the document",
          });
        })
        .catch((err) => {
          res.status(500).json({ error: "Couldn't delete the document" });
        });
    } else {
      res.status(500).json({ error: "cannot delete - invalid ID" });
    }
  });
  
  //UPDATE USER BIO
  router.patch("/:id", (req, res) => {
    const updates = req.body;
    const id = req.params.id;
  
    if (ObjectId.isValid(id)) {
      db.db.collection("users")
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: updates,
          },
          { upsert: true },
        )
        .then((result) =>
          res.status(200).json({
            result: result,
            message: "Updated the document",
          }),
        )
        .catch((err) => {
          res.status(500).json({ error: "Couldn't update the document" });
        });
    } else {
      res.status(500).json({ error: "Couldn't update the document- Invalid ID" });
    }
    });
  
    module.exports=router;