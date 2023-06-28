const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const homepage = require(resolveApp("package.json")).homepage;
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  public: resolveApp("public"),
  src: resolveApp("client"),
  wwwroot: resolveApp("wwwroot"),
  get: resolveApp,
  publicPath: (!isDevelopment && homepage ? new URL(homepage).pathname : "") + "/",
};
