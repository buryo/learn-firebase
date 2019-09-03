"use strict";

const admin = require("firebase-admin");
const db = admin.firestore();
const router = require("express")();
const util = require("util");
const _ = require("../helper");

router.post("/", (req, res) => {
  let errors = {};
  let { question, options } = req.body;
  let userIp = util.format(req.headers["x-forwarded-for"]);

  question = _.trimAndDoubleSpaces(question);
  Object.keys(options).map(
    key => (options[key] = _.trimAndDoubleSpaces(options[key]))
  );

  // question validation
  if (question === undefined || _.stringIsEmpty(question)) {
    errors.question = "Question cannot be empty.";
  }

  if (options === undefined || _.objIsEmpty(options)) {
    errors.options = "Options cannot be empty.";
  }

  if (userIp === undefined || _.stringIsEmpty(userIp)) {
    errors.ip = "Your ip address is undefined.";
  }

  // return all errors if any exists
  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
  }

  const newPoll = {
    question,
    userIp,
    options,
    createdAt: new Date().toISOString(),
  };

  db.collection("poll")
    .add(newPoll)
    .then(doc => {
      res.json({
        message: `Document ${doc.id} created successfully`,
      });
      return null;
    })
    .catch(err => {
      res.status(500).json({
        error: "Something went wrong!",
      });
      console.log(err);
    });

  return null;
});

module.exports = router;