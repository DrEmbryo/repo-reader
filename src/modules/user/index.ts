import express from "express";

import { octokitClient } from "../../utils/octokitClient";

export const userRouts = express.Router();

userRouts.get("/", async function (req, res) {
  res.render("./user/index");
});

userRouts.post("/search", async (req, res) => {
  try {
    const user = await octokitClient.request("GET /users/{username}", {
      username: req.body.username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const following = await octokitClient.request(
      `GET ${user.data.following_url}`
    );

    return res.render("./user/components/profile-grid", {
      user: user.data,
      following: following.data,
    });
  } catch (requestError: any) {
    if (requestError.status === 404)
      return res.render("./user/components/empty-results");
  }
});
