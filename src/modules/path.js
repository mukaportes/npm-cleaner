const convertStrToWinPath = (rawPath) => {
  return rawPath.replace(/\\/g, '\\\\');
};

module.exports = {
  convertStrToWinPath,
};
