import express from "express";

import { octokitClient } from "../../utils/octokitClient";

export const userRouts = express.Router();

userRouts.get("/", async function (req, res) {
  res.render("./user/index");
});

userRouts.post("/search", async (req, res) => {
  const user = await octokitClient.request("GET /users/{username}", {
    username: req.body.username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  console.log(user);
});
