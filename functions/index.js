const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const app = require("express")();
const util = require("util");

app.set("trust proxy", true);
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

const trimAndDoubleSpaces = string => {
    return string.trim().replace(/\s\s+/g, ' ');
}

const objIsEmpty = obj => {
  if (Object.keys(obj).length > 0 && Object.values(obj).length > 0) {
    if (!Object.values(obj).some(x => x.trim() === "" || x === null)) {
      return false;
    }
  }
  return true;
};

const stringIsEmpty = string => {
  return string.trim() === "" ? true : false;
};

app.get("/polls", (req, res) => {
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

app.post("/create-poll", (req, res) => {
  let errors = {};
  let { question, options } = req.body;

  question = trimAndDoubleSpaces(question);
  Object.keys(options).map(key => (options[key] = trimAndDoubleSpaces(options[key])));

  // question validation
  if (question === undefined || stringIsEmpty(question)) {
    errors.question = "Question cannot be empty.";
  }

  if (options === undefined || objIsEmpty(options)) {
    errors.options = "Options cannot be empty.";
  }

  // return all errors if any exists
  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
  }

  const newPoll = {
    question,
    userIp: "127.0.0.1",
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

// TODO: create routes

// https://example.com/api/*routes*
exports.api = functions.region("europe-west1").https.onRequest(app);
