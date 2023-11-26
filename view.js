const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
  .command('viewTable', 'View the content of a table in a Database', {
    db_name: {
      describe: 'Name of the Database',
      demandOption: true,
      type: 'string',
    },
    table_name: {
      describe: 'Name of the table to be viewed',
      demandOption: true,
      type: 'string',
    },
  })
  .argv;

const fileName = 'database.json';
let databaseData = {};

try {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  databaseData = JSON.parse(fileContent);
} catch (error) {
  console.error(`Error reading Database`);
  process.exit(1)
}
function viewTable(dbName, tableName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (!databaseData[dbName].hasOwnProperty(tableName)) {
    console.error(`Table with name '${tableName}' does not exist in '${dbName}' database.`);
    process.exit(1);
  }
  if (!databaseData[dbName][tableName].hasOwnProperty('records')) {
    console.log(`Table '${tableName}' in '${dbName}' database is empty.`);
  } else {
    const tableRecords = databaseData[dbName][tableName].records;
    console.log(`Table '${tableName}' in '${dbName}' database:`);
    console.table(tableRecords);
  }
}
viewTable(argv.db_name, argv.table_name);
