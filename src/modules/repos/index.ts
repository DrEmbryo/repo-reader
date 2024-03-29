import express from "express";

import { getPages } from "../../utils/getPagination";
import { octokitClient } from "../../utils/octokitClient";

export const repositoryRouts = express.Router();

repositoryRouts.get("/", async function (req, res) {
  res.render("./repos/index");
});

repositoryRouts.post("/search", async (req, res) => {
  const itemsPerPage = 10;
  const activePage = req.body?.page || 1;

  const repos = await octokitClient.request("GET /search/repositories", {
    q: encodeURIComponent(req.body.search),
    per_page: itemsPerPage,
    page: activePage,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const totalPages = Math.floor(repos.data.total_count / itemsPerPage);

  if (repos.data.total_count === 0)
    return res.render("./repos/components/empty-results");

  return res.render("./repos/components/repository-card", {
    repos: repos.data.items,
    pages: totalPages,
    activePage,
    pagination: getPages(parseInt(activePage, 10), 5, totalPages),
  });
});
