const fs = require("fs");
const path = require("path");
const { stdin } = require("process");

const pathFile = path.join(__dirname, "text.txt");

console.log(
  'Please, write text and click enter.\nFor exit write "exit" or click "ctrl + c"'
);

const writeStream = fs.createWriteStream(pathFile);

stdin.on("data", (data) => {
  const str = String(data).trim();
  if (str === "exit") {
    process.exit();
  }

  writeStream.write(str + "\n");
});

process.on("SIGINT", () => {
  process.exit();
});

process.on("exit", () => {
  console.log("End write text, good bye!");
  writeStream.end();
});
