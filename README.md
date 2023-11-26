# Database Management Script

This script allows you to create and manage a simple document-database using the command line.

## Commands

- ### Create a Database

    ```bash
    node create.js createDB --db_name <database_name>
    ```

- ### Create a Table inside that Database

    ```bash
    node create.js createTable --db_name <Database_name> --table_name <table_name>
    ```

- ### View the content of a Table

    ```bash
    node view.js viewTable --db_name myDatabase --table_name myTable
    ```

- ### Delete the Table/Database

    ```bash

    node delete.js deleteTable <database_name> <table_name>


    node delete.js deleteDB <database_name>
    ```


- ### Add Field names to the Table 

    ```bash
    node add.js Field <database_name> <table_name> <name,age,gender>
    ```


- ### Insert data into the Table
    ```bash
    node add.js Value <database_name> <table_name>
    ```

- ### Alter the Fields of a Table

    ```bash
    node alter.js <database_name> <table_name> <newFields to add>
    ```
