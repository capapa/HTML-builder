const fsp = require("fs/promises");
const fs = require("fs");
const path = require("path");

const copyDir = async (nameDir = []) => {
  try {
    const pathFrom = path.join(__dirname, "assets", ...nameDir);
    const pathTo = path.join(__dirname, "project-dist", "assets", ...nameDir);
    await fsp.rm(pathTo, { recursive: true, force: true });
    await fsp.mkdir(pathTo, { recursive: true });
    const files = await fsp.readdir(pathFrom, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        copyDir([...nameDir, file.name]);
      } else {
        const fileFrom = path.join(pathFrom, file.name);
        const fileTo = path.join(pathTo, file.name);
        fsp.copyFile(fileFrom, fileTo);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const buildCSS = async () => {
  try {
    const arr = [];
    const pathFrom = path.join(__dirname, "styles");
    const fileBundle = path.join(__dirname, "project-dist", "style.css");
    const ws = fs.createWriteStream(fileBundle);
    const files = await fsp.readdir(pathFrom);
    for (const file of files) {
      const fileFrom = path.join(pathFrom, file);
      const { ext } = path.parse(fileFrom);
      if (ext === ".css") {
        const data = await fsp.readFile(fileFrom, {
          encoding: "utf-8",
        });
        arr.push(data);
      }
    }

    ws.write(arr.join(""));
    ws.end();
  } catch (err) {
    console.log(err);
  }
};

const buildHTML = async () => {
  try {
    const pathTemplate = path.join(__dirname, "template.html");
    const pathFrom = path.join(__dirname, "components");
    const fileBundle = path.join(__dirname, "project-dist", "index.html");

    const ws = fs.createWriteStream(fileBundle);
    let template = await fsp.readFile(pathTemplate, { encoding: "utf-8" });
    const files = await fsp.readdir(pathFrom);

    for (const file of files) {
      const fileFrom = path.join(pathFrom, file);
      const { name: tag, ext } = path.parse(fileFrom);
      if (ext === ".html") {
        const dataTemplate = await fsp.readFile(fileFrom, {
          encoding: "utf-8",
        });
        template = template.replace(`{{${tag}}}`, dataTemplate);
      }
    }

    ws.write(template);
    ws.end();
  } catch (err) {
    console.log(err);
  }
};

copyDir();
buildCSS();
buildHTML();
