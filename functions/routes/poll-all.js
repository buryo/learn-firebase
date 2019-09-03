"use strict";

const admin = require("firebase-admin");
const db = admin.firestore();
const router = require("express")();

router.get("/", (req, res) => {
  // console.log(util.format(req.headers['x-forwarded-for'])) // Here is the ip address

  db.collection("poll")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let polls = [];

      data.forEach(doc => {
        polls.push({
          pollId: doc.id,
          question: doc.data().question,
          options: doc.data().options,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(polls);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;