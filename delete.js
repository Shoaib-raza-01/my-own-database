const fs = require('fs');
const readlineSync = require('readline-sync');

const fileName = 'database.json';
let databaseData = {};

try {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  databaseData = JSON.parse(fileContent);
} catch (error) {
  console.warn(`Error reading database`);
}
function deleteTable(dbName, tableName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (!databaseData[dbName].hasOwnProperty(tableName)) {
    console.error(`Table with name '${tableName}' does not exist in '${dbName}' database.`);
    process.exit(1);
  }
  delete databaseData[dbName][tableName];
  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);
  console.log(`Table '${tableName}' deleted from '${dbName}' database.`);
}
function deleteDatabase(dbName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  const confirmation = readlineSync.keyInYNStrict(`Are you sure you want to delete the database '${dbName}'?`);
  if (!confirmation) {
    console.log('Operation canceled. Database not deleted.');
    process.exit(0);
  }
  delete databaseData[dbName];

  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);

  console.log(`Database '${dbName}' deleted. File updated: ${fileName}`);
}
const [_, __, command, dbName, tableName] = process.argv;

if (command === 'deleteTable') {
  deleteTable(dbName, tableName);
} else if (command === 'deleteDB') {
  deleteDatabase(dbName);
}
