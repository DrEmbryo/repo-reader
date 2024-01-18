import express from "express";
import bodyParser from "body-parser";
import { Octokit } from "octokit";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT, GITHUB_TOKEN } = process.env;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

app.get("/", async function (req, res) {
  res.render("index");
});

app.post("/search", async (req, res) => {
  const repos = await octokit.request("GET /search/repositories", {
    q: encodeURIComponent(req.body.search),
    per_page: 10,
    page: 1,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log(repos.data.items);

  return res.render("components/repository-card", { repos: repos.data.items });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
