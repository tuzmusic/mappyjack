const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const chokidar = require("chokidar");

const filePath = path.resolve("./Mappy/");
const compilerPath = "~/dev/HackManager/tools/JackCompiler.sh";

console.log("watching", filePath);

function compile() {
  try {
    const res = childProcess
      .execSync(["sh", compilerPath, filePath].join(" "))
      .toString();
    console.log(res);
  } catch (error) {
    const compilerError = error.message.split("\n").slice(1).join("\n");
    console.warn(compilerError);
  }
}

const watcher = chokidar.watch(filePath + "**/*.jack");

watcher.on("all", (type, filename,...args) => {
  console.log(path.basename(filename), type);
  compile();
});
