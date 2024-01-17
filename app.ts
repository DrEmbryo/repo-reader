import express from "express";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

const port = 3000;

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
