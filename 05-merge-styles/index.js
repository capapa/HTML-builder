const fsp = require("fs/promises");
const fs = require("fs");
const path = require("path");

const build = async () => {
  try {
    const arr = [];
    const pathFrom = path.join(__dirname, "styles");
    const fileBundle = path.join(__dirname, "project-dist", "bundle.css");
    const ws = fs.createWriteStream(fileBundle);
    const files = await fsp.readdir(pathFrom);
    for (const file of files) {
      const fileFrom = path.join(pathFrom, file);
      const { ext } = path.parse(fileFrom);
      if (ext === ".css") {
        const rs = fs.createReadStream(fileFrom, { encoding: "utf-8" });
        rs.on("data", (chunk) => arr.push(chunk));
      }
    }

    process.on("exit", () => {
      ws.write(arr.join(""));
      ws.end();
    });
  } catch (err) {
    console.log(err);
  }
};

build();
