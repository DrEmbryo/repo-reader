import express from "express";
import bodyParser from "body-parser";

import { repositoryRouts } from "./src/modules/repos";
import { userRouts } from "./src/modules/user";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/repos", repositoryRouts);
app.use("/users", userRouts);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
