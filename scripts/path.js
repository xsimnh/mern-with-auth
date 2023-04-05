const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  public: resolveApp("public"),
  src: resolveApp("src"),
  wwwroot: resolveApp("wwwroot"),
  get: resolveApp,
};
