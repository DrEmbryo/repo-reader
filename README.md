# GitHub Repository Viewer (Node.js, EJS, and HTMX)

## About this project

The GitHub Repository Viewer project is a dynamic and interactive web application designed to provide users with a seamless experience for exploring GitHub repositories.
Leveraging the power of Node.js, EJS (Embedded JavaScript), and HTMX, this project combines server-side rendering, templating, and asynchronous communication to create modern user interface.

## Installation guide

### Installation option:

- Nix flake + pnpm:
  1. Allow [nix flakes](https://nixos.wiki/wiki/Flakes) in your configuration
  2. Open dev shell in your terminal by running `nix develop`
  3. Install all dependencies by running `pnpm install`
  4. Run the Node app by running `pnpm run:dev`
- Without usage of nix
  1. Install Node.js (current version is 19_x)
  2. Install package manager of your choice
  3. Install project dependencies
  4. Execute `run:dev` script

### Running the app:

Before running the app some preparation are needed:

1. Generate github token for the app (in your github account go to: settings -> tokens -> generate new token)
2. Create and fill env file (please take a look at example.env for a reference)
