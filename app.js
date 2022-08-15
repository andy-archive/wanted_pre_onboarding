const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to wanted_job_opening" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
