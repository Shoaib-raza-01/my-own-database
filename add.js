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
function addFieldsToTable(dbName, tableName, fields) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (!databaseData[dbName].hasOwnProperty(tableName)) {
    console.error(`Table with name '${tableName}' does not exist in '${dbName}' database.`);
    process.exit(1); 
  }

  if (databaseData[dbName][tableName].hasOwnProperty('fields')) {
    console.error(`Fields are already defined for table '${tableName}' in '${dbName}' database.`);
    process.exit(1);
  }
  const newFields = fields.split(',');
  if (!newFields.includes('id')) {
    newFields.unshift('id');
  }

  databaseData[dbName][tableName].fields = newFields;
  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);
  console.log(`Fields [${newFields}] added to table '${tableName}' in '${dbName}' database.`);
}

function addValuesToTable(dbName, tableName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (!databaseData[dbName].hasOwnProperty(tableName)) {
    console.error(`Table with name '${tableName}' does not exist in '${dbName}' database.`);
    process.exit(1);
  }
  if (!databaseData[dbName][tableName].hasOwnProperty('fields')) {
    console.error(`Fields are not defined for table '${tableName}' in '${dbName}' database. Please run 'Field' first.`);
    process.exit(1); 
  }
  const fields = databaseData[dbName][tableName].fields;
  const record = {};
  fields.forEach((field) => {
    const value = readlineSync.question(`${field}: `);
    record[field] = value;
  });

  if (!databaseData[dbName][tableName].hasOwnProperty('records')) {
    databaseData[dbName][tableName].records = [];
  }
  databaseData[dbName][tableName].records.push(record);
  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);

  console.log(`Values added to table '${tableName}' in '${dbName}' database.`);
}
const [_, __, command, dbName, tableName] = process.argv;

if (command === 'Field') {
  addFieldsToTable(dbName, tableName, process.argv[5]);
} else if (command === 'Value') {
  addValuesToTable(dbName, tableName);
}
