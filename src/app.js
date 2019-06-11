const fs = require('fs');
const { isDirectory, removeFilesFromDir } = require('./modules/directory');

const run = (basePath) => new Promise((resolve, reject) => {
  fs.readdir(basePath, async (error, files) => {
    if (error) reject(error);

    for (let i = 0, length = files.length; i < length; i += 1) {
      const path = `${basePath}\\${files[i]}`;
      const isDir = await isDirectory(path);

      if (isDir) {
        removeFilesFromDir(path).catch(error => reject(error));
      } else {
        fs.unlink(path, (error) => {
          if (error) reject(error);
        });
      }
    }
  });

  resolve();
});

module.exports.run = run;