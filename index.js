const express = require("express");
const app = express();

app.use(express.json());

const movis = require("./routes/movis");
const rating = require("./routes/rating");

app.listen(3000, () => {
  console.log("server is running:");
});

app.use("/cinema", movis);
app.use("/cinema", rating);
