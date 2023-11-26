const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
  .command('createDB', 'Create or update a Database', {
    db_name: {
      describe: 'Name your Database',
      demandOption: true,
      type: 'string',
    },
  })
  .command('createTable', 'Create a table in a Database', {
    db_name: {
      describe: 'Name of the Database',
      demandOption: true,
      type: 'string',
    },
    table_name: {
      describe: 'Name of the table to be added',
      demandOption: true,
      type: 'string',
    },
  }).argv;
const fileName = 'database.json';
let databaseData = {};
try {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  databaseData = JSON.parse(fileContent);
} catch (error) {
  console.warn(`Error reading ${fileName}: ${error.message}`);
}
function createOrUpdateDatabase(dbName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    databaseData[dbName] = {};
    console.log(`Database with name '${dbName}' created.`);
  } else {
    console.log(`Database with name '${dbName}' already exists.`);
  }
  const jsonData = JSON.stringify(databaseData, null, 2);
  fs.writeFileSync(fileName, jsonData);
}
function createTableInDatabase(dbName, tableName) {
  if (!databaseData.hasOwnProperty(dbName)) {
    console.error(`Database with name '${dbName}' does not exist.`);
    process.exit(1);
  }
  if (databaseData[dbName].hasOwnProperty(tableName)) {
    console.log(`Table with name '${tableName}' already exists in '${dbName}' database.`);
  } else {
    databaseData[dbName][tableName] = {};
    const jsonData = JSON.stringify(databaseData, null, 2);
    fs.writeFileSync(fileName, jsonData);
    console.log(`Table with name '${tableName}' added to '${dbName}' database.`);
  }
}
if (argv._[0] === 'createDB') {
  createOrUpdateDatabase(argv.db_name);
} else if (argv._[0] === 'createTable') {
  createTableInDatabase(argv.db_name, argv.table_name);
}
