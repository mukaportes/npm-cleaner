const fs = require('fs');
const { isPathBlacklisted, removeDirectory, generateRegex } = require('./modules/directory');
const { convertStrToWinPath } = require('./modules/path');

const run = (rawBasePath) => new Promise((resolve, reject) => {
  const basePath = convertStrToWinPath(rawBasePath);
  const regexRule = generateRegex();

  fs.readdir(basePath, async (error, content) => {
    if (error) reject(error);

    for (let i = 0, length = content.length; i < length; i += 1) {
      const path = `${basePath}\\${content[i]}`;
      const isWhitelisted = isPathBlacklisted(path, regexRule);

      if (isWhitelisted) {
        await removeDirectory(path);
      }
    }
  });

  resolve();
});

module.exports.run = run;