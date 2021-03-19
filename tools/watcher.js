const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

console.log("watching");

const filePath = path.resolve("./Mappy/");
const compilerPath = "~/dev/HackManager/tools/JackCompiler.sh";

function compile() {
  try {
    const res = childProcess
      .execSync(["sh", compilerPath, filePath].join(" "))
      .toString();
    console.log(res);
  } catch (error) {
    const compilerError = error.message.split("\n").slice(1).join("\n");
    console.log(compilerError);
  }
}

fs.watch(filePath, (event, filename) => {
  const ext = path.extname(filename);
  if (ext !== ".jack") return;

  console.log(filename, "changed.");
  compile();
});
/* 
"Command failed: sh ~/dev/HackManager/tools/JackCompiler.sh /Users/tuzmacbookpro2017/Documents/CompSci/nand2tetris/MappyJack/Mappy\nIn Main.jack (line 9): In subroutine MethName21: A void function must not return a value\nIn Main.jack (line 9): In subroutine MethName21: Expected - or ~ or ( in term\n"
*/
