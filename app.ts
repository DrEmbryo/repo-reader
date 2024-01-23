import express from "express";
import bodyParser from "body-parser";

import { Octokit } from "octokit";
import { getPages } from "./src/utils/getPagination";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

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
  const itemsPerPage = 10;
  const activePage = req.body?.page || 1;

  const repos = await octokit.request("GET /search/repositories", {
    q: encodeURIComponent(req.body.search),
    per_page: 10,
    page: activePage,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const totalPages = Math.floor(repos.data.total_count / itemsPerPage);

  if (repos.data.total_count === 0)
    return res.render("components/empty-results");

  return res.render("components/repository-card", {
    repos: repos.data.items,
    pages: totalPages,
    activePage,
    pagination: getPages(parseInt(activePage, 10), 5, totalPages),
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
