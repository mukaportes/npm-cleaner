const fs = require('fs');

/**
 * Verifies if path is from a file or a directory
 * @param {string} path Path to be verified
 * @returns {boolean} Condition indicating if the path is from a file or a directory
 */
const isDirectory = async (path) => new Promise((resolve, reject) => {
  fs.stat(path, (error, stats) => {
    if (error) reject(error);

    return resolve(stats.isDirectory());
  });
});

/**
 * 
 * @param {string} dirPath Path of a directory
 * @returns {Promise} Resolving void if successful and rejects with error if there's any
 */
const removeFilesFromDir = (dirPath) => new Promise((resolve, reject) => {
  fs.readdir(dirPath, async (error, files) => {
    if (error) reject(error);

    for (let i = 0, length = files.length; i < length; i += 1) {
      const path = `${dirPath}\\${files[i]}`;
      const isDir = await isDirectory(path);

      if (isDir) {
        await removeFilesFromDir(path);
      } else {
        console.log(`Deleting: ${path}`);
        fs.unlink(path, (error) => {
          if (error) reject(error);
        });
      }
    }

    fs.rmdir(dirPath, (error) => {
      if (error) reject(error);
    });
  });

  resolve();
});

module.exports = {
  isDirectory,
  removeFilesFromDir,
};