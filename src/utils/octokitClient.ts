import { Octokit } from "octokit";

const { GITHUB_TOKEN } = process.env;

export const octokitClient = new Octokit({
  auth: GITHUB_TOKEN,
});
