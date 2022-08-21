const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced database.");
  })
  .catch(err => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to wanted job opening!" });
});
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
