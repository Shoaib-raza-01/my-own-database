const fs = require('fs');

const fileName = 'database.json';
let databaseData = {};

try {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  databaseData = JSON.parse(fileContent);
} catch (error) {
  console.warn(`Error reading Database`);
}
function addFieldsToTable(dbName, tableName, newFields) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (!databaseData[dbName].hasOwnProperty(tableName)) {
    console.error(`Table with name '${tableName}' does not exist in '${dbName}' database.`);
    process.exit(1);
  }
  if (!databaseData[dbName][tableName].hasOwnProperty('fields')) {
    console.error(`Fields are not defined for table '${tableName}' in '${dbName}' database.`);
    process.exit(1);
  }
  const existingFields = databaseData[dbName][tableName].fields;
  const newFieldsArray = newFields.split(',');
  newFieldsArray.forEach((newField) => {
    if (existingFields.includes(newField)) {
      console.error(`Field '${newField}' already exists in table '${tableName}'.`);
      process.exit(1); 
    }
  });
  databaseData[dbName][tableName].fields.push(...newFieldsArray);
  if (!databaseData[dbName][tableName].hasOwnProperty('records')) {
    databaseData[dbName][tableName].records = [];
  }
  databaseData[dbName][tableName].records.forEach((record) => {
    newFieldsArray.forEach((newField) => {
      if (!record.hasOwnProperty(newField)) {
        record[newField] = null;
      }
    });
  });
  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);
  console.log(`New fields [${newFieldsArray}] added to table '${tableName}' in '${dbName}' database. File updated: ${fileName}`);
}

const [_, __, dbName, tableName, newFields] = process.argv;
addFieldsToTable(dbName, tableName, newFields);
