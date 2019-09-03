"use strict";

const admin = require("firebase-admin");
const db = admin.firestore();
const router = require("express")();

router.get("/:id", (req, res) => {
  db.collection("poll")
    .doc("RQxaIeDaq9JjP8SUuarM")
    .get()
    .then(doc => {
        return res.json(doc.data());
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;