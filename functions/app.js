const app = require("express")();
const routes = require("./routes/index.js");
app.set("trust proxy", true);

routes(app);

module.exports = app;