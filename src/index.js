const app = require('./app');

// TEMP
const basePath = 'C:\\sample\\folder';

app.run(basePath)
  .then(() => console.log('Operation successful'))
  .catch(error => console.error(error));