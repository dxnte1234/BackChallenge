require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const mongoDB = require("./src/db/dbM");
const user = require("./src/routes/user");
const post = require("./src/routes/posts");

app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/post", post);
app.get("/", (req, res) => {
  res.status(200).send("Hey there!");
});

mongoDB.connect
  .then((message) => {
    console.log(message);
    app.listen(port, () => {
      console.log(`Server listening on ${port} port.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });