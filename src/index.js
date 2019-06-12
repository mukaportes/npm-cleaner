const readline = require('readline');
const app = require('./app');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.question('Enter the folder path: ', (path) => {
  console.log('Input path: ', path);

  app.run(path)
  .then(() => console.log('Operation successful'))
  .catch(error => console.error('Opetation failed. Error: ', error));
  
  readlineInterface.close();
});