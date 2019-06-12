const rimRaf = require('rimraf');
const folderBlacklist = require('../config/path-blacklist');

const generateRegex = () => {
  let strRegex = '';
  const folderBlacklistedKeys = Object.keys(folderBlacklist);

  folderBlacklistedKeys.forEach((folder, index) => {
    if (index < folderBlacklistedKeys.length - 1) {
      strRegex += (folderBlacklist[folder] + '|');
    } else {
      strRegex += folderBlacklist[folder];
    }

  });

  return strRegex;
}

/**
 * Verifies if path is whitelisted
 * @param {string} path Path to be verified
 * @returns {boolean} Condition indicating if the path whitelisted or not
 */
const isPathBlacklisted = (path, regexRule) => {
  const regex = new RegExp(regexRule, 'gi');

  return path.match(regex) !== null;
};

/**
 * 
 * @param {string} dirPath Path of a directory
 * @returns {Promise} Resolving void if successful and rejects with error if there's any
 */
const removeDirectory = (dirPath) => new Promise((resolve, reject) => {
  rimRaf(dirPath, (error) => {
    if (error) {
      reject(error);
    }

    resolve();
  });
});

module.exports = {
  generateRegex,
  isPathBlacklisted,
  removeDirectory,
};