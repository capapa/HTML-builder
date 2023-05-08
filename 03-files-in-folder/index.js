const fs = require("fs/promises");
const path = require("path");

const showDir = async () => {
  try {
    const pathFolder = path.join(__dirname, "secret-folder");
    const files = await fs.readdir(pathFolder, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const pathFile = path.join(pathFolder, file.name);
        const { name, ext } = path.parse(pathFile);
        const { size } = await fs.stat(pathFile);
        console.log(
          name + " - " + ext.slice(1) + " - " + (size / 1024).toFixed(3) + "kb"
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

showDir();
