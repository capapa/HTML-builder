const fs = require("fs/promises");
const path = require("path");

const copyDir = async () => {
  try {
    const pathFrom = path.join(__dirname, "files");
    const pathTo = path.join(__dirname, "files-copy");
    await fs.rm(pathTo, { recursive: true, force: true });
    await fs.mkdir(pathTo, { recursive: true });
    const files = await fs.readdir(pathFrom);
    for (const file of files) {
      const fileFrom = path.join(pathFrom, file);
      const fileTo = path.join(pathTo, file);
      fs.copyFile(fileFrom, fileTo);
    }
  } catch (err) {
    console.log(err);
  }
};

copyDir();
