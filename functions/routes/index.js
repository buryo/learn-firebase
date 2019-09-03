const router = require('express').Router();
const pollAll =  require("./poll-all");
const pollCreate = require("./poll-create");
const pollSingle = require("./poll-single");
const pollVote =  require("./poll-vote");

module.exports = function(app) {
  app.use("/polls", pollAll);
  app.use("/poll-create", pollCreate);
  app.use("/poll", pollSingle);
};
